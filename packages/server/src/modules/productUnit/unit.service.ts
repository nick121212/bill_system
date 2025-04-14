import { EntityManager, Like, Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { ProductUnitEntity, UserEntity } from "@bill/database/dist/entities";
import { HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import dataFilter from "@/common/utils/dataFilter";
import { Log4jsService } from "@/modules/log4js";

import { ProductUnitBodyRequest, ProductUnitQuery } from "./unit.interface";

@Injectable()
export class ProductUnitService {
  constructor(
    @InjectRepository(ProductUnitEntity)
    private repo: Repository<ProductUnitEntity>,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity }
  ) {}

  async all(
    query: ProductUnitQuery,
    user?: ActiveUserData
  ): Promise<{ rows: ProductUnitEntity[]; count: number }> {
    const { name, ...rest } = query.where || {};
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...rest,
        ...(name ? { name: Like(`%${name}%`) } : {}),
        ...dataFilter(this.request.userEntity),
      },
    });

    return {
      rows,
      count,
    };
  }

  async findOrCreate(name: string) {
    const data = await this.repo.findOneBy({
      name,
      companyId: this.request.userEntity.company?.id,
    });

    if (data) {
      return data;
    }

    return this.create({
      name,
      label: name,
      desc: name,
      
    });
  }

  async getById(id?: number): Promise<ProductUnitEntity | null> {
    if (!id) {
      return null;
    }

    const data = await this.repo.findOneBy({
      id,
    });

    return data || null;
  }

  async getByIdWithError(id?: number): Promise<ProductUnitEntity> {
    const category = await this.getById(id);

    if (!category) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: "ProductUnitEntity",
        }
      );
    }

    return category;
  }

  async create(
    body: ProductUnitBodyRequest,
    user?: ActiveUserData
  ): Promise<ProductUnitEntity> {
    const { ...rest } = body;

    const child = new ProductUnitEntity().extend({
      ...rest,
      companyId: this.request.userEntity.company?.id,
      userId: this.request.userEntity.id,
    });

    return await this.repo.save(child);
  }

  async update(
    id: number,
    body: ProductUnitBodyRequest
  ): Promise<ProductUnitEntity> {
    const child = await this.getByIdWithError(id);

    child.label = body.label;
    child.name = body.name;
    child.desc = body.desc;

    return this.repo.save(child);
  }

  async remove(id: number) {
    const child = await this.getByIdWithError(id);

    return this.repo.remove(child);
  }
}
