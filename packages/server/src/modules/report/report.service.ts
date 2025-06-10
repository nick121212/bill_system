import type { FindOptionsRelations, Repository } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { ReportEntity, UserEntity } from "@bill/database/dist/entities";
import { Global, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import { ApiException } from "@/common/exception/api.exception";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import dataFilter from "@/common/utils/dataFilter";

import type { ReportQuery, ReportRequest } from "./report.interface";

@Injectable()
@Global()
export class ReportService {
  constructor(
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity },
    @InjectRepository(ReportEntity) private repo: Repository<ReportEntity>
  ) {}

  async all(
    query: ReportQuery
  ): Promise<{ rows: ReportEntity[]; count: number }> {
    const { ...rest } = query?.where || {};
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        ...rest,
      },
      relations: {
        user: true,
        company: true,
      },
      select: ["user", "company"],
      withDeleted: false,
    });

    return {
      rows: rows,
      count,
    };
  }

  async getById(
    id?: number,
    relations?: FindOptionsRelations<ReportEntity>
  ): Promise<ReportEntity | null> {
    if (!id) {
      return null;
    }

    const data = await this.repo.findOne({
      where: { id },
      relations,
    });

    return data || null;
  }

  async getByIdWithError(
    id?: number,
    relations?: FindOptionsRelations<ReportEntity>
  ): Promise<ReportEntity> {
    const user = await this.getById(id, relations);

    if (!user) {
      throw new ApiException(
        "can not find recoed",
        ApiStatusCode.KEY_NOT_EXIST,
        HttpStatus.OK,
        {
          id: id,
          type: "ReportEntity",
        }
      );
    }

    return user;
  }

  async create(body: ReportRequest): Promise<ReportEntity> {
    const { ...rest } = body;
    const report = new ReportEntity().extend({
      ...rest,
        ...dataFilter(this.request.userEntity),
    });

    return await this.repo.save(report);
  }

  async remove(id: number) {
    const child = await this.getByIdWithError(id);

    return this.repo.remove(child);
  }
}
