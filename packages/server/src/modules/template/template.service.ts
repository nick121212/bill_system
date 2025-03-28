import * as _ from "lodash";
import { EntityManager, In, Not, Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import {
  ProductCategoryEntity,
  ProductEntity,
  TemplateCategoryEntity,
  TemplateCategoryProductEntity,
  TemplateEntity,
  UserEntity,
} from "@bill/database/dist/entities";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import dataFilter from "@/common/utils/dataFilter";

import { TemplateBodyRequest, TemplateQuery } from "./template.interface";

@Injectable()
export class TemplateService {
  constructor(
    private em: EntityManager,
    @InjectRepository(TemplateEntity) private repo: Repository<TemplateEntity>,
    @InjectRepository(TemplateCategoryEntity)
    private repoTC: Repository<TemplateCategoryEntity>,
    @InjectRepository(TemplateCategoryProductEntity)
    private repoTCP: Repository<TemplateCategoryProductEntity>,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity }
  ) {}

  async all(
    query: TemplateQuery,
    user?: ActiveUserData
  ): Promise<{
    count: number;
    rows: TemplateEntity[];
  }> {
    const whereCondition = {
      ...query.where,
      ...dataFilter(this.request.userEntity),
    };

    if (query.ids && query.ids.length > 0) {
      whereCondition["id"] = Not(In(query.ids));
    }

    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: whereCondition,
    });

    return {
      count,
      rows,
    };
  }

  async getById(id?: number): Promise<TemplateEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const data = await this.repo.findOneBy({
      id,
    });

    return data || undefined;
  }

  async getByIdWithError(id?: number): Promise<TemplateEntity> {
    const category = await this.getById(id);

    if (!category) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: "TemplateEntity",
        }
      );
    }

    return category;
  }

  async getByIdWithCategories(id?: number) {
    await this.getByIdWithError(id);

    const categories = (await this.repoTC.find({
      where: {
        templateId: id,
      },
      relations: {
        category: true,
      },
    })) as (TemplateCategoryEntity & {
      products: TemplateCategoryProductEntity[];
    })[];

    const categoryProducts = await this.repoTCP.find({
      where: {
        templateCategory: {
          id: In(categories.map((c) => c.id)),
        },
      },
      relations: {
        templateCategory: true,
        product: {
          unit: true,
        },
      },
    });

    const categoryMap = _.keyBy(categories, "id");

    for (const cp of categoryProducts) {
      const category = categoryMap[cp.templateCategory.id];

      if (category) {
        if (!category.products) {
          category.products = [];
        }
        category.products.push(cp);
      }
    }

    return categories;
  }

  async saveData(
    child: TemplateEntity,
    body: TemplateBodyRequest,
    remove = false
  ) {
    return await this.em.transaction(async (entityManager: EntityManager) => {
      const template = await entityManager.save(child);
      const categories: Promise<unknown>[] = [];
      const products: Promise<unknown>[] = [];

      if (remove) {
        await this.repoTCP.delete({
          templateId: template.id,
        });
        await this.repoTC.delete({
          templateId: template.id,
        });
      }

      for (const c of body.categories) {
        const productCategory =
          await entityManager.findOneBy<ProductCategoryEntity>(
            ProductCategoryEntity,
            {
              id: c.productCategoryId,
            }
          );

        if (!productCategory) {
          throw new ApiException(
            "can not find recoed",
            ApiStatusCode.KEY_NOT_EXIST,
            HttpStatus.OK,
            {
              id: c.productCategoryId,
              type: "ProductCategory",
            }
          );
        }

        const templateCategory = new TemplateCategoryEntity().extend({
          category: productCategory,
          templateId: child.id,
          name: c.name,
        });
        categories.push(entityManager.save(templateCategory));

        for (const p of c.products) {
          const product = await entityManager.findOneBy(ProductEntity, {
            id: p.productId,
          });

          if (!product) {
            throw new ApiException(
              "can not find recoed",
              ApiStatusCode.KEY_NOT_EXIST,
              HttpStatus.OK,
              {
                id: p,
                type: "Product",
              }
            );
          }

          const templateCategoryProduct =
            new TemplateCategoryProductEntity().extend({
              product: product,
              price: p.price,
              count: p.count,
              templateCategory: templateCategory,
              templateId: child.id,
            });

          products.push(entityManager.save(templateCategoryProduct));
        }
      }

      await Promise.all([...categories, ...products]).catch((e) => {
        throw e;
      });

      return template;
    });
  }

  async create(
    body: TemplateBodyRequest,
    user?: ActiveUserData
  ): Promise<TemplateEntity> {
    const { categories, ...rest } = body;
    const child = new TemplateEntity().extend({
      // ...rest,
      name: rest.name,
      desc: rest.desc,
      companyId: user?.companyId,
      userId: user?.id,
      status: 1,
    });

    return this.saveData(child, body);
  }

  async update(id: number, body: TemplateBodyRequest): Promise<TemplateEntity> {
    const child = await this.getByIdWithError(id);

    child.extend({
      desc: body.desc,
      name: body.name,
    });

    return this.saveData(child, body, true);
  }

  async remove(id: number) {
    const child = await this.getByIdWithError(id);

    return this.repo.softRemove(child);
  }
}
