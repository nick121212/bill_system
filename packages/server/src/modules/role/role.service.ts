import * as crypto from "crypto";
import { Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { MenuEntity, RoleEntity } from "@bill/database/dist/entities";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { MenuService } from "@/modules/menu/menu.service";

import { RoleQuery, RoleRequest } from "./role.interface";

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity) private repo: Repository<RoleEntity>,
    private menuService: MenuService
  ) {}

  async all(
    query: RoleQuery,
    withRelation = false
  ): Promise<{ rows: RoleEntity[]; count: number }> {
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

  async getByIdWithPermission(id: number): Promise<RoleEntity> {
    const data = await this.getById(id, true);

    if (!data) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          entity: "RoleEntity",
        }
      );
    }

    return data;
  }

  async getById(
    id?: number,
    withRelation = false
  ): Promise<RoleEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const data = await this.repo.findOne({
      where: {
        id,
      },
      relations: withRelation
        ? {
            menus: true,
          }
        : {},
    });

    return data || undefined;
  }

  async create(body: RoleRequest): Promise<RoleEntity> {
    const { menus, ...rest } = body;
    const role = new RoleEntity().extend({
      ...rest,
    });

    return await this.repo.save(role);
  }

  async update(id: number, body: RoleRequest): Promise<RoleEntity> {
    const role = await this.getById(id);
    const { menus, ...rest } = body;

    if (!role) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          entity: "RoleEntity",
        }
      );
    }

    role.extend(rest);

    return this.repo.save(role);
  }

  async remove(id: number) {
    const role = await this.getById(id);

    if (!role) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    return this.repo.softRemove(role);
  }
}
