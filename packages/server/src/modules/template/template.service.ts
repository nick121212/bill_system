import { forkJoin } from "rxjs";
import { EntityManager, Repository } from "typeorm";
import { ApiStatusCode, PermissionType } from "@bill/database";
import {
  ProductCategoryEntity,
  ProductEntity,
  TemplateCategoryEntity,
  TemplateEntity,
} from "@bill/database/dist/entities";
import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/exception/api.exception";
import { Log4jsService } from "@/modules/log4js";
import { ProductService } from "@/modules/product/product.service";
import { ProductCategoryService } from "@/modules/productCategory/category.service";

import { TemplateBodyRequest, TemplateQuery } from "./template.interface";

@Injectable()
export class TemplateService {
  constructor(
    private logger: Log4jsService,
    @InjectRepository(TemplateEntity) private repo: Repository<TemplateEntity>,
    private em: EntityManager,
    private productCategoryService: ProductCategoryService,
    private productService: ProductService
  ) {}

  async all(query: TemplateQuery): Promise<{
    count: number;
    rows: TemplateEntity[];
  }> {
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...query.where,
      },
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

  async create(body: TemplateBodyRequest): Promise<TemplateEntity> {
    const child = new TemplateEntity().extend({
      ...body,
      categories: [],
    });

    return await this.em.transaction(async (entityManager: EntityManager) => {
      const template = await entityManager.save(child);
      const categories: Promise<unknown>[] = [],
        products: Promise<unknown>[] = [];

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
          template: template,
          category: productCategory,
        })
        categories.push(entityManager.save(templateCategory));

        for (const p of c.products) {
          const product = await entityManager.findOneBy(ProductEntity, {
            id: p,
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

          products.push(entityManager.save(product));
        }
      }

      await Promise.all([...categories, ...products]).catch((e) => {
        console.log(e);
        throw e;
      });

      return template;
    });
  }

  async update(id: number, body: TemplateBodyRequest): Promise<TemplateEntity> {
    const child = await this.getById(id);

    if (!child) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    child.desc = body.desc;
    child.name = body.name;

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

    return this.repo.softRemove(child);
  }
}
