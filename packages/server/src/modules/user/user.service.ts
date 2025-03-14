import type { Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { UserEntity } from "@bill/database/dist/entities";
import { HttpStatus, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import hashPwd from "@/common/utils/hash";
import { RoleService } from "@/modules/role/role.service";

import { CompanyService } from "../company/company.service";
import type { UserQuery, UserRequest } from "./user.interface";

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
        // ...rest,
        // role: {
        //   id: roleId,
        // },
        // role: await this.roleService.getById(roleId),
      },
      relations: {
        role: true,
        company: true,
      },
      withDeleted: false,
    });

    return {
      rows,
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
    const user = await this.getById(id);
    const { password, company, role, ...rest } = body;

    if (!user) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    user.extend({
      ...rest,
      role: await this.roleService.getById(role),
      company: await this.companyService.getById(company),
    });

    return this.repo.save(user);
  }

  async remove(id: number) {
    const child = await this.getById(id);

    if (!child) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    return this.repo.softRemove(child);
  }
}
