import type { Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { UserEntity } from "@bill/database/dist/entities";
import { HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import hashPwd from "@/common/utils/hash";
import { RoleService } from "@/modules/role/role.service";

import { CompanyService } from "../company/company.service";
import type {
  UserPasswordRequest,
  UserQuery,
  UserRequest,
} from "./user.interface";

@Injectable()
export class UserService {
  constructor(
    private configService: ConfigService,
    private roleService: RoleService,
    private companyService: CompanyService,
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>
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
      select: ["role", "company"],
      withDeleted: false,
    });

    return {
      rows: rows.map((u) => {
        u.password = "";
        return u;
      }),
      count,
    };
  }

  async getById(id?: number): Promise<UserEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const data = await this.repo.findOneBy({
      id,
    });

    return data || undefined;
  }

  async getByIdWithError(id?: number): Promise<UserEntity> {
    const user = await this.getById(id);

    if (!user) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: "UserEntity",
        }
      );
    }

    return user;
  }

  async findOne(fullname: string, pass: string): Promise<UserEntity | null> {
    return this.repo.findOne({
      where: {
        fullname: fullname,
        password: hashPwd(pass, this.configService.get("app").secret),
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
      password: hashPwd(
        password ?? "123456789",
        this.configService.get("app").secret
      ),
      role: await this.roleService.getById(role),
      company: await this.companyService.getById(company),
    });

    return await this.repo.save(user);
  }

  async update(id: number, body: UserRequest): Promise<UserEntity> {
    const user = await this.getByIdWithError(id);
    const { password, company, role, ...rest } = body;

    user.extend({
      ...rest,
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
      hashPwd(body.password, this.configService.get("app").secret)
    ) {
      throw new ApiException(
        "password not correct",
        ApiStatusCode.PASSWORD_NOT_CORRECT,
        HttpStatus.OK
      );
    }

    if (body.passwordNew !== body.passwordNewAgain) {
      throw new ApiException(
        "2 passwords are not match.",
        ApiStatusCode.TWO_PASSWORDS_NOT_MATCH,
        HttpStatus.OK
      );
    }

    userEntity.password = hashPwd(
      body.passwordNew,
      this.configService.get("app").secret
    );

    return this.repo.save(userEntity);
  }
}
