import { Between, Repository } from "typeorm";
import { UserEntity } from "@bill/database";
import { TotalAmountView } from "@bill/database";
import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import dataFilter from "@/common/utils/dataFilter";

import { StatisticsQuery } from "./statistics.interface";

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(TotalAmountView)
    private repo: Repository<TotalAmountView>,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity }
  ) {}

  async all(
    query: StatisticsQuery
  ): Promise<{ rows: TotalAmountView[]; count: number }> {
    const userEntity = this.request.userEntity;
    const { customerId, createTimeStart, createTimeEnd } =
      query.where || {};
    const where: any = {};
    
    if (userEntity.company?.id) {
      where.companyId = userEntity.company.id;
    }
    
    if (customerId) {
      where.customerId = customerId;
    }
    
    if (createTimeStart && createTimeEnd) {
      where.createTime = Between(createTimeStart, createTimeEnd);
    }

    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where,
      relations: {},
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }
}
