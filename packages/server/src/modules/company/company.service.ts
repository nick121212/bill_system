import * as crypto from "crypto";
import * as _ from "lodash";
import { In, Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import {
  CompanyEntity,
  MenuEntity,
  RoleEntity,
} from "@bill/database/dist/entities";
import { HttpStatus, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";

import { CompanyRequest, CompanyQuery } from "./company.interface";

@Injectable()
export class CompanyService {
  constructor(
    @InjectRepository(CompanyEntity) private repo: Repository<CompanyEntity>
  ) {}

  async all(
    query: CompanyQuery,
    withRelation = false
  ): Promise<{ rows: CompanyEntity[]; count: number }> {
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...query.where,
      },
      relations: {},
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }

  async getById(
    id?: number,
    loadRelationIds = false
  ): Promise<CompanyEntity | null> {
    if (!id) {
      return null;
    }

    const data = await this.repo.findOne({
      where: {
        id,
      },
    });

    return data || null;
  }

  async create(body: CompanyRequest): Promise<CompanyEntity> {
    const { ...rest } = body;
    const company = new CompanyEntity().extend({
      ...rest,
    });

    return await this.repo.save(company);
  }

  async update(id: number, body: CompanyRequest): Promise<CompanyEntity> {
    const role = await this.getById(id);
    const { ...rest } = body;

    if (!role) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          entity: "CompanyEntity",
        }
      );
    }

    role.extend(rest);

    return this.repo.save(role);
  }

  async remove(id: number) {
    const role = await this.getById(id);

    if (!role) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK
      );
    }

    return this.repo.softRemove(role);
  }
}
