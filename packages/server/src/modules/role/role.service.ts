import * as crypto from "crypto";
import * as _ from "lodash";
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

  getValidMenus(menus: MenuEntity[], menuIds: number[], parentId = 0) {
    for (const key in menus) {
      if (Object.prototype.hasOwnProperty.call(menus, key)) {
        const menu = menus[key];

        if (menuIds.indexOf(menu.id) < 0) {
          _.remove(menus, function (n, i) {
            return i.toString() === key;
          });
        } else {
          menu.parentId = parentId;
          menu.children?.length &&
            (menu.children = this.getValidMenus(menu.children, menuIds, menu.id));
        }
      }
    }
    return menus;
  }

  async getByIdWithPermission(id: number): Promise<RoleEntity> {
    const data = await this.getById(id, true);
    const menuTree = await this.menuService.all();

    if (!data || !menuTree) {
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

    const menuIds = data.menus;

    data.menus = this.getValidMenus(menuTree, menuIds as any);

    return data;
  }

  async getById(
    id?: number,
    loadRelationIds = false
  ): Promise<RoleEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const data = await this.repo.findOne({
      where: {
        id,
      },
      loadRelationIds: loadRelationIds,
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
