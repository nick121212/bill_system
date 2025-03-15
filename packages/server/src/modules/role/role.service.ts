import * as crypto from "crypto";
import * as _ from "lodash";
import { In, Repository } from "typeorm";
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
      relations: {
        menus: true,
      },
      loadRelationIds: true,
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }

  shouldHideMenu(menu: MenuEntity, checkIds: number[]) {
    if (checkIds.indexOf(menu.id) >= 0) {
      return true;
    }

    if (!menu.children?.length) {
      return false;
    }

    for (const key in menu.children) {
      const child = menu.children[key];

      child.showed = this.shouldHideMenu(child, checkIds);
    }

    return (
      menu.children?.filter((c) => {
        return c.showed;
      }).length > 0
    );
  }

  removeUselessMenu(menus: MenuEntity[]) {
    _.remove(menus, (m) => {
      return m.showed === false;
    });

    for (const key in menus) {
      const element = menus[key];

      if (element.children?.length) {
        this.removeUselessMenu(element.children);
      }
    }
  }

  getValidMenus(menus: MenuEntity[], menuIds: number[], parentId = 0) {
    this.shouldHideMenu(
      new MenuEntity().extend({
        id: -1,
        children: menus,
      }),
      menuIds
    );

    this.removeUselessMenu(menus);

    return menus;

    // const removeIds: { menus: Array<MenuEntity>; removeId: number }[] = [];

    // for (const key in menus) {
    //   if (Object.prototype.hasOwnProperty.call(menus, key)) {
    //     const menu = menus[key];

    //     if (menuIds.indexOf(menu.id) < 0) {
    //       // _.remove(menus, function (n, i) {
    //       //   return i.toString() === key;
    //       // });
    //       removeIds.push({ menus, removeId: menu.id });
    //     } else {
    //       menu.parentId = parentId;
    //       menu.children?.length &&
    //         // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    //         (menu.children = this.getValidMenus(
    //           menu.children,
    //           menuIds,
    //           menu.id
    //         ));
    //     }
    //   }
    // }

    // for (const key in removeIds) {
    //   if (Object.prototype.hasOwnProperty.call(removeIds, key)) {
    //     const remove = removeIds[key];

    //     _.remove(remove.menus, (m) => {
    //       return m.id === remove.removeId;
    //     });
    //   }
    // }

    // return menus;
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

    role.menus = await this.repo.manager.find(MenuEntity, {
      where: {
        id: In(menus || []),
      },
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

    role.menus = await this.repo.manager.find(MenuEntity, {
      where: {
        id: In(menus || []),
      },
    });

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
