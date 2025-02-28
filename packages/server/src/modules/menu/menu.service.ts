import { EntityManager, Repository } from "typeorm";
import { PermissionType } from "@bill/database";
import { MenuEntity, UserEntity } from "@bill/database/dist/entities";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

@Injectable()
export class MenuService {
  constructor(
    @InjectRepository(MenuEntity) private repo: Repository<MenuEntity>,
    private em: EntityManager
  ) {}

  async all() {
    const trees = await this.repo.manager
      .getTreeRepository(MenuEntity)
      .findTrees();

    return trees;
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

    console.log(child1);

    await this.em.transaction(async (transactionalEntityManager) => {
      await transactionalEntityManager.save(dashboard);

      await Promise.all([
        transactionalEntityManager.save(child1),
        transactionalEntityManager.save(child2),
      ]);
    });
  }
}
