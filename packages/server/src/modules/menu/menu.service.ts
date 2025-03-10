import { EntityManager, Repository } from "typeorm";
import { ApiStatusCode, PermissionType } from "@bill/database";
import { MenuEntity, UserEntity } from "@bill/database/dist/entities";
import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { Log4jsService } from "@/modules/log4js";

import { MenuBodyRequest } from "./menu.interface";

@Injectable()
export class MenuService {
  constructor(
    private logger: Log4jsService,
    @InjectRepository(MenuEntity) private repo: Repository<MenuEntity>,
    private em: EntityManager
  ) {}

  async all(): Promise<MenuEntity[]> {
    const trees = await this.repo.manager
      .getTreeRepository(MenuEntity)
      .findTrees();

    return trees;
  }

  async getById(id?: number): Promise<MenuEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const menu = await this.repo.findOne({
      where: {
        id,
      },
      relations: {
        parent: true,
      },
    });

    if (menu) {
      menu.parentId = menu?.parent?.id;
      menu.parent = undefined;
    }

    return menu || undefined;
  }

  async create(body: MenuBodyRequest): Promise<MenuEntity> {
    const { id, parentId, ...rest } = body;

    const child = new MenuEntity().extend({
      ...rest,
      children: [],
      parent: await this.getById(parentId || 0),
    });

    return await this.repo.save(child);
  }

  async update(id: number, body: MenuBodyRequest): Promise<MenuEntity> {
    const child = await this.getById(id);

    if (!child) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    child.icon = body.icon;
    child.label = body.label;
    child.name = body.name;
    child.order = body.order;
    child.route = body.route;
    child.type = body.type;

    child.parent = undefined;

    if (body.parentId) {
      child.parent = await this.getById(body.parentId);
    }

    return this.repo.save(child);
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

    return this.repo.remove(child);
  }

  async testData() {
    const dashboard = new MenuEntity().extend({
      label: "sys.menu.dashboard",
      name: "Dashboard",
      icon: "ic-analysis",
      type: PermissionType.CATALOGUE,
      route: "dashboard",
      order: 1,
    });

    const child1 = new MenuEntity().extend({
      label: "sys.menu.dashboard1",
      name: "Dashboard-Child1",
      icon: "ic-analysis",
      type: PermissionType.CATALOGUE,
      route: "dashboard",
      order: 1,
      parent: dashboard,
    });
    const child2 = new MenuEntity().extend({
      label: "sys.menu.dashboard1",
      name: "Dashboard-Child2",
      icon: "ic-analysis",
      type: PermissionType.CATALOGUE,
      route: "dashboard",
      order: 1,
      parent: dashboard,
    });

    return await this.em.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(dashboard);

      return await Promise.all([
        transactionalEntityManager.save(child1),
        transactionalEntityManager.save(child2),
      ]);
    });
  }
}
