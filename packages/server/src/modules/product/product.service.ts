import { Like, Repository, Not, In } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { ProductEntity, UserEntity } from "@bill/database/dist/entities";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import dataFilter from "@/common/utils/dataFilter";
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
    private productUnitService: ProductUnitService,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity }

  ) {}

  async all(
    query: ProductQuery,
    user: ActiveUserData
  ): Promise<{ rows: ProductEntity[]; count: number }> {
    const { name, excludeIds, ...otherConditions } = query.where || {};
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...otherConditions,
        ...(name ? { name: Like(`%${name}%`) } : {}),
        ...(excludeIds ? { id: Not(In(excludeIds)) } : {}),
        ...dataFilter(this.request.userEntity),
        // companyId: user?.companyId,
        // userId: user.id,
      },
      relations: {
        category: true,
        unit: true,
      },
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }

  async getById(id?: number): Promise<ProductEntity | null> {
    if (!id) {
      return null;
    }

    const data = await this.repo.findOneBy({
      id,
    });

    return data || null;
  }

  async getByIdWithError(id?: number): Promise<ProductEntity> {
    const category = await this.getById(id);

    if (!category) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: "ProductEntity",
        }
      );
    }

    return category;
  }

  async create(
    body: ProductBodyRequest,
    user?: ActiveUserData
  ): Promise<ProductEntity> {
    const { unitId, categoryId, id, ...rest } = body;
    const unit = await this.productUnitService.getById(unitId);
    const category = await this.productCategoryService.getByIdWithError(
      categoryId
    );
    const child = new ProductEntity().extend({
      ...rest,
      companyId: user?.companyId,
      userId: user?.id,
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
