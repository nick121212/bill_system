import { EntityManager, Like, Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import {
  ProductUnitEntity,
} from "@bill/database/dist/entities";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { Log4jsService } from "@/modules/log4js";

import { ProductUnitBodyRequest, ProductUnitQuery } from "./unit.interface";

@Injectable()
export class ProductUnitService {
  constructor(
    private logger: Log4jsService,
    @InjectRepository(ProductUnitEntity) private repo: Repository<ProductUnitEntity>,
    private em: EntityManager
  ) {}

  async all(
    query: ProductUnitQuery
  ): Promise<{ rows: ProductUnitEntity[]; count: number }> {
    const { name } = query.where || {};
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...query.where,
        ...(name ? { name: Like(`%${name}%`) } : {}),
      },
    });

    return {
      rows,
      count,
    };
  }

  async getById(id?: number): Promise<ProductUnitEntity | undefined> {
    if (!id) {
      return undefined;
    }

    const data = await this.repo.findOneBy({
      id,
    });

    return data || undefined;
  }

  async create(body: ProductUnitBodyRequest): Promise<ProductUnitEntity> {
    const { ...rest } = body;

    const child = new ProductUnitEntity().extend({
      ...rest,
    });

    return await this.repo.save(child);
  }

  async update(id: number, body: ProductUnitBodyRequest): Promise<ProductUnitEntity> {
    const child = await this.getById(id);

    if (!child) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    child.label = body.label;
    child.name = body.name;
    child.desc = body.desc;

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

    return this.repo.remove(child);
  }
}
