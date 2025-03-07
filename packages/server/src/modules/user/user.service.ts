import * as crypto from "crypto";
import { Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { UserEntity } from "@bill/database/dist/entities";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";

import { UserQuery, UserRequest } from "./user.interface";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity) private repo: Repository<UserEntity>
  ) {}

  async all(query: UserQuery): Promise<{ rows: UserEntity[]; count: number }> {
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...query.where,
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
        password: crypto.hash("sha1", pass),
      },
      relations: {
        role: true,
      },
    });
  }

  async create(body: UserRequest): Promise<UserEntity> {
    const { ...rest } = body;
    const user = new UserEntity().extend({
      ...rest,
    });

    return await this.repo.save(user);
  }

  async update(id: number, body: UserRequest): Promise<UserEntity> {
    const user = await this.getById(id);

    if (!user) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    user.extend(body);

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
