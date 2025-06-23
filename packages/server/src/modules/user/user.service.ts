import * as dayjs from 'dayjs';
import type { FindOptionsRelations, Repository } from 'typeorm';
import { ApiStatusCode } from '@bill/database';
import { UserEntity } from '@bill/database/dist/entities';
import { Global, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { InjectRepository } from '@nestjs/typeorm';

import { ApiException } from '@/common/exception/api.exception';
import { ActiveUserData } from '@/common/interfaces/active-user-data.interface';
import hashPwd from '@/common/utils/hash';
import { RoleService } from '@/modules/role/role.service';

import { CompanyService } from '../company/company.service';
import type {
  UserPasswordRequest,
  UserQuery,
  UserRequest,
} from './user.interface';

@Injectable()
@Global()
export class UserService {
  constructor(
    private configService: ConfigService,
    private roleService: RoleService,
    private companyService: CompanyService,
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>,
  ) {}

  async all(query: UserQuery): Promise<{ rows: UserEntity[]; count: number }> {
    const { role, ...rest } = query?.where || {};
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...rest,
        role: role?.id ? { id: ~~role.id } : undefined,
      },
      relations: {
        role: true,
        company: true,
      },
      select: ['role', 'company'],
      withDeleted: false,
    });

    return {
      rows: rows.map((u) => {
        u.password = '';
        u.validateDate = (u.validateDate || 0) * 1;
        u.expireDay = dayjs(u.validateDate)
          .startOf('day')
          .diff(dayjs().startOf('day'), 'day');
        return u;
      }),
      count,
    };
  }

  async getById(
    id?: number,
    relations?: FindOptionsRelations<UserEntity>,
  ): Promise<UserEntity | null> {
    if (!id) {
      return null;
    }

    const data = await this.repo.findOne({
      where: { id },
      relations,
    });

    if (data) {
      data.expireDay = dayjs((data.validateDate || 0) * 1)
        .startOf('day')
        .diff(dayjs().startOf('day'), 'day');
    }

    if (data?.role?.label === 'admin') {
      data.expireDay = 9999;
    }

    return data || null;
  }

  async getByIdWithError(
    id?: number,
    relations?: FindOptionsRelations<UserEntity>,
  ): Promise<UserEntity> {
    const user = await this.getById(id, relations);

    if (!user) {
      throw new ApiException(
        'can not find recoed',
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: 'UserEntity',
        },
      );
    }

    return user;
  }

  async findOne(email: string, pass: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: {
        email,
        password: hashPwd(
          pass,
          this.configService.get<{ secret: string }>('app')?.secret || '',
        ),
      },
      relations: {
        role: true,
        company: true,
      },
    });
  }

  async create(body: UserRequest): Promise<UserEntity> {
    const { password, company, role, ...rest } = body;
    const user = new UserEntity().extend({
      ...rest,
      avatar: rest.avatar || '',
      password: hashPwd(
        password ?? '123456789',
        this.configService.get<{ secret: string }>('app')?.secret || '',
      ),
      role: (await this.roleService.getById(role)) ?? undefined,
      company: (await this.companyService.getById(company)) ?? undefined,
    });

    return await this.repo.save(user);
  }

  async update(id: number, body: UserRequest): Promise<UserEntity> {
    const user = await this.getByIdWithError(id);
    const { company, role, validateDate, ...rest } = body;

    user.extend({
      ...rest,
      avatar: rest.avatar || '',
      password: user.password,
      validateDate: (validateDate as any) * 1 || 0,
      role: await this.roleService.getById(role),
      company: await this.companyService.getById(company),
    });

    return this.repo.save(user);
  }

  async remove(id: number) {
    const child = await this.getByIdWithError(id);

    return this.repo.softRemove(child);
  }

  async changePassword(body: UserPasswordRequest, user: ActiveUserData) {
    const userEntity = await this.getByIdWithError(user.id);

    if (
      userEntity.password !==
      hashPwd(
        body.password,
        this.configService.get<{ secret: string }>('app')?.secret || '',
      )
    ) {
      throw new ApiException(
        'password not correct',
        ApiStatusCode.PASSWORD_NOT_CORRECT,
        HttpStatus.OK,
      );
    }

    if (body.passwordNew !== body.passwordNewAgain) {
      throw new ApiException(
        '2 passwords are not match.',
        ApiStatusCode.TWO_PASSWORDS_NOT_MATCH,
        HttpStatus.OK,
      );
    }

    userEntity.password = hashPwd(
      body.passwordNew,
      this.configService.get<{ secret: string }>('app')?.secret || '',
    );

    return this.repo.save(userEntity);
  }
}
