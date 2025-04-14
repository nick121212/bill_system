import { BigNumber } from "bignumber.js";
import xlsx from "node-xlsx";
import { Like, Repository, Not, In, ILike } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import {
  ProductCategoryEntity,
  ProductEntity,
  UserEntity,
} from "@bill/database/dist/entities";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import dataFilter from "@/common/utils/dataFilter";
import { toPrice } from "@/common/utils/price";
import { Log4jsService } from "@/modules/log4js";
import { ProductCategoryService } from "@/modules/productCategory/category.service";
import { ProductUnitService } from "@/modules/productUnit/unit.service";

import { ProductBodyRequest, ProductQuery } from "./product.interface";

@Injectable()
export class ProductService {
  constructor(
    private logger: Log4jsService,
    @InjectRepository(ProductEntity) private repo: Repository<ProductEntity>,
    private productUnitService: ProductUnitService,
    private productCategoryService: ProductCategoryService,
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
        // category: true,
        unit: true,
      },
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }

  async getProductsThroughCategory(
    category: ProductCategoryEntity,
    query: ProductQuery
  ) {
    const { name, productId, ...rest } = query.where || {};

    return this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        id: In(category.products || []),
        ...(name ? { name: ILike(`%${name}%`) } : {}),
        ...(productId ? { id: In([productId]) } : {}),
        ...dataFilter(this.request.userEntity),
      },
      relations: {
        unit: true,
      },
      withDeleted: false,
    });
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
    const { unitId, id, ...rest } = body;
    const unit = await this.productUnitService.getByIdWithError(unitId);
    const child = new ProductEntity().extend({
      ...rest,
      price: toPrice(body.price),
      cost: toPrice(body.cost),
      companyId: user?.companyId,
      userId: user?.id,
    });

    child.unit = unit;

    return await this.repo.save(child);
  }

  async update(id: number, body: ProductBodyRequest): Promise<ProductEntity> {
    const product = await this.getByIdWithError(id);
    const unit = await this.productUnitService.getByIdWithError(body.unitId);

    product.label = body.label;
    product.name = body.name;
    product.cost = toPrice(body.cost);
    product.desc = body.desc;
    product.price = toPrice(body.price);
    product.unit = unit;

    return this.repo.save(product);
  }

  async remove(id: number) {
    const child = await this.getByIdWithError(id);

    return this.repo.softRemove(child);
  }

  async uploadFile(file: Express.Multer.File) {
    const workSheetsFromBuffer = xlsx.parse(file.buffer);

    if (workSheetsFromBuffer.length <= 0) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          type: "ProductEntity",
        }
      );
    }

    const workSheet = workSheetsFromBuffer[0];
    const rows = workSheet.data.splice(1);
    const products: ProductEntity[] = [];
    const categoryMap: Record<string, ProductCategoryEntity> = {};

    for (const row of rows) {
      const cateName = row[0];
      const unit = await this.productUnitService.findOrCreate(row[4]);

      if (!categoryMap[cateName]) {
        categoryMap[cateName] = await this.productCategoryService.findOrCreate(
          cateName,
          { products: [], name: cateName, label: cateName, desc: cateName }
        );
      }

      const product = new ProductEntity().extend({
        name: row[1],
        price: toPrice(row[6]),
        cost: toPrice(row[5]),
        desc: row[3] || row[4] || "",
        label: row[1] || "",
        companyId: this.request.userEntity.company?.id,
        userId: this.request.userEntity.id,
        unit,
      });

      products.push(product);
      categoryMap[cateName].products.push(product);
    }

    const result = await this.repo.save(products);

    for (const category of Object.values(categoryMap)) {
      await this.productCategoryService.update(category.id, {
        ...category,
        products: products.map((p) => p.id),
      });
    }

    return result;
  }
}
