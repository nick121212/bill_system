import { EntityManager, ILike, In, Like, Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import {
  ProductCategoryEntity,
  ProductEntity,
  UserEntity,
} from "@bill/database/dist/entities";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectEntityManager, InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import { BaseQuery } from "@/common/interfaces/query";
import dataFilter from "@/common/utils/dataFilter";
import { Log4jsService } from "@/modules/log4js";

import {
  ProductCategoryQuery,
  ProductCategoryRequest,
} from "./category.interface";

@Injectable()
export class ProductCategoryService {
  constructor(
    @InjectRepository(ProductCategoryEntity)
    private repo: Repository<ProductCategoryEntity>,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity },
    @InjectEntityManager() private em: EntityManager
  ) {}

  async all(
    query: ProductCategoryQuery,
    user?: ActiveUserData
  ): Promise<{ rows: ProductCategoryEntity[]; count: number }> {
    const { name, ...rest } = query.where || {};
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...rest,
        ...(name ? { name: ILike(`%${name}%`) } : {}),
        ...dataFilter(this.request.userEntity),
      },
    });

    return {
      rows,
      count,
    };
  }

  async getById(id?: number): Promise<ProductCategoryEntity | null> {
    if (!id) {
      return null;
    }

    const data = await this.repo.findOne({
      where: {
        id,
      },
      relations: ["products"],
      loadRelationIds: true,
    });

    return data || null;
  }

  async getProducts(
    id: number,
    query: BaseQuery
  ): Promise<{ rows: ProductEntity[]; count: number }> {
    const category = await this.getByIdWithError(id);

    const [rows, count] = await this.em.findAndCount(ProductEntity, {
      where: {
        id: In(category.products),
        ...dataFilter(this.request.userEntity),
      },
      skip: query.skip,
      take: query.take,
    });

    return {
      rows,
      count,
    };
  }

  async getByIdWithError(id?: number): Promise<ProductCategoryEntity> {
    const category = await this.getById(id);

    if (!category) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: "ProductCategoryEntity",
        }
      );
    }

    return category;
  }

  async create(
    body: ProductCategoryRequest,
    user?: ActiveUserData
  ): Promise<ProductCategoryEntity> {
    const { products, ...rest } = body;
    const category = new ProductCategoryEntity().extend({
      ...rest,
      companyId: user?.companyId,
      userId: user?.id,
    });

    return await this.em.transaction(async (entityManager: EntityManager) => {
      const savedCategory = await entityManager.save(category);

      const ProductEntities = await entityManager.find(ProductEntity, {
        where: {
          id: In(products),
        },
      });

      savedCategory.products = ProductEntities;

      await entityManager.save(category);

      return savedCategory;
    });
  }

  async update(
    id: number,
    body: ProductCategoryRequest
  ): Promise<ProductCategoryEntity> {
    const { products, ...rest } = body;
    const category = await this.getByIdWithError(id);

    category.extend({
      ...rest,
    });

    return await this.em.transaction(async (entityManager: EntityManager) => {
      const savedCategory = await entityManager.save(category);

      const ProductEntities = await entityManager.find(ProductEntity, {
        where: {
          id: In(products),
        },
      });

      savedCategory.products = ProductEntities;

      await entityManager.save(savedCategory);

      return savedCategory;
    });
  }

  async remove(id: number) {
    const data = await this.getByIdWithError(id);

    return this.repo.remove(data);
  }
}
