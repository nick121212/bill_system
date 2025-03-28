import { Repository } from "typeorm";
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
    const [rows, count] = await this.repo.findAndCount({
      skip: query.skip,
      take: query.take,
      where: {
        companyId: userEntity.company?.id,
      },
      relations: {},
      withDeleted: false,
    });

    return {
      rows,
      count,
    };
  }
}
