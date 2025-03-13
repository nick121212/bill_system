import { EntityManager, Repository } from "typeorm";
import { ApiStatusCode, PermissionType } from "@bill/database";
import {
  MenuEntity,
  ProductEntity,
  UserEntity,
} from "@bill/database/dist/entities";
import { HttpCode, HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { Log4jsService } from "@/modules/log4js";
import { ProductCategoryService } from "@/modules/productCategory/category.service";
import { ProductUnitService } from "@/modules/productUnit/unit.service";

import { ProductBodyRequest, ProductQuery } from "./product.interface";

@Injectable()
export class ProductService {
  constructor(
    private logger: Log4jsService,
    @InjectRepository(ProductEntity) private repo: Repository<ProductEntity>,
    private productCategoryService: ProductCategoryService,
    private productUnitService: ProductUnitService
  ) {}

  async all(
    query: ProductQuery
  ): Promise<{ rows: ProductEntity[]; count: number }> {
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...query.where,
      },
      relations: {
        category: true,
        unit: true
      },
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }

  async getById(id?: number): Promise<ProductEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const data = await this.repo.findOneBy({
      id,
    });

    return data || undefined;
  }

  async create(body: ProductBodyRequest): Promise<ProductEntity> {
    const { unitId, categoryId, id, ...rest } = body;
    const unit = await this.productCategoryService.getById(unitId);
    const category = await this.productCategoryService.getById(categoryId);
    const child = new ProductEntity().extend({
      ...rest,
    });

    if (!unit || !category) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    child.category = category;
    child.unit = unit;

    return await this.repo.save(child);
  }

  async update(id: number, body: ProductBodyRequest): Promise<ProductEntity> {
    const product = await this.getById(id);
    const unit = await this.productCategoryService.getById(body.unitId);
    const category = await this.productCategoryService.getById(body.categoryId);

    if (!product || !unit || !category) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    product.label = body.label;
    product.name = body.name;
    product.cost = body.cost;
    product.desc = body.desc;
    product.price = body.price;
    product.category = category;
    product.unit = unit;

    return this.repo.save(product);
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
