import { EntityManager, Repository } from "typeorm";
import { ApiStatusCode, PermissionType } from "@bill/database";
import { MenuEntity, UserEntity } from "@bill/database/dist/entities";
import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { Log4jsService } from "@/modules/log4js";

import { MenuBodyRequest } from "./menu.interface";

/**
 * 菜单服务
 * 用于管理系统的菜单树结构，包括菜单的增删改查等操作
 */
@Injectable()
export class MenuService {
  constructor(
    private logger: Log4jsService,
    @InjectRepository(MenuEntity) private repo: Repository<MenuEntity>,
    private em: EntityManager
  ) {}

  /**
   * 获取所有菜单
   * @returns 返回完整的菜单树结构
   */
  async all(): Promise<MenuEntity[]> {
    const trees = await this.repo.manager
      .getTreeRepository(MenuEntity)
      .findTrees({
        relations: ["parent"],
      });

    return trees;
  }

  /**
   * 根据ID获取菜单
   * @param id 菜单ID
   * @returns 返回菜单实体，如果不存在返回 null
   */
  async getById(id?: number): Promise<MenuEntity | null> {
    if (!id) {
      return null;
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
      menu.parent = null;
    }

    return menu || null;
  }

  /**
   * 根据ID获取菜单，如果不存在则抛出异常
   * @param id 菜单ID
   * @returns 返回菜单实体
   * @throws ApiException 当菜单不存在时
   */
  async getByIdWithError(id?: number): Promise<MenuEntity> {
    const menu = await this.getById(id);

    if (!menu) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: "MenuEntity",
        }
      );
    }

    return menu;
  }

  /**
   * 创建新菜单
   * @param body 菜单创建请求体
   * @returns 返回新创建的菜单实体
   */
  async create(body: MenuBodyRequest): Promise<MenuEntity> {
    const { id, parentId, ...rest } = body;

    const child = new MenuEntity().extend({
      ...rest,
      children: [],
      parent: await this.getById(parentId || 0),
    });

    return await this.repo.save(child);
  }

  /**
   * 更新菜单
   * @param id 要更新的菜单ID
   * @param body 菜单更新请求体
   * @returns 返回更新后的菜单实体
   */
  async update(id: number, body: MenuBodyRequest): Promise<MenuEntity> {
    const child = await this.getByIdWithError(id);

    child.icon = body.icon;
    child.label = body.label;
    child.name = body.name;
    child.order = body.order;
    child.route = body.route;
    child.type = body.type;
    child.component = body.component;

    child.parent = null;

    if (body.parentId) {
      child.parent = await this.getById(body.parentId);
    }

    return this.repo.save(child);
  }

  /**
   * 删除菜单
   * @param id 要删除的菜单ID
   * @returns 返回删除的菜单实体
   * @throws ApiException 当菜单不存在时
   */
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
}
