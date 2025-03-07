import { EntityManager, Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { ProductCategoryEntity } from "@bill/database/dist/entities";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/exception/api.exception";
import { Log4jsService } from "@/modules/log4js";

import {
  ProductCategoryQuery,
  ProductCategoryRequest,
} from "./category.interface";

@Injectable()
export class ProductCategoryService {
  constructor(
    private logger: Log4jsService,
    @InjectRepository(ProductCategoryEntity)
    private repo: Repository<ProductCategoryEntity>,
    private em: EntityManager
  ) {}

  async all(
    query: ProductCategoryQuery
  ): Promise<{ rows: ProductCategoryEntity[]; count: number }> {
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...query.where,
      },
    });

    return {
      rows,
      count,
    };
  }

  async getById(id?: number): Promise<ProductCategoryEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const data = await this.repo.findOneBy({
      id,
    });

    return data || undefined;
  }

  async create(body: ProductCategoryRequest): Promise<ProductCategoryEntity> {
    const { ...rest } = body;
    const category = new ProductCategoryEntity().extend({
      ...rest,
    });

    return await this.repo.save(category);
  }

  async update(id: number, body: ProductCategoryRequest): Promise<ProductCategoryEntity> {
      const category = await this.getById(id);
  
      if (!category) {
        throw new ApiException(
          "can not find recoed",
          ApiStatusCode.KEY_NOT_EXIST,
          HttpStatus.OK
        );
      }

      category.extend({
        ...body
      });
  
      return this.repo.save(category);
    }

  async remove(id: number) {
    const data = await this.getById(id);

    if (!data) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    return this.repo.remove(data);
  }
}
