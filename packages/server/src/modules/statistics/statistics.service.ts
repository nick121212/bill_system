import { Between, In, Not, Repository } from "typeorm";
import { UserEntity } from "@bill/database";
import { TotalAmountView } from "@bill/database";
import { OrderStatus } from "@bill/database/dist/enums/OrderStatus";
import { Inject, Injectable } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { InjectRepository } from "@nestjs/typeorm";

import { StatisticsQuery } from "./statistics.interface";

@Injectable()
export class StatisticsService {
  constructor(
    @InjectRepository(TotalAmountView)
    private repo: Repository<TotalAmountView>,
    @Inject(REQUEST) private request: Request & { userEntity: UserEntity }
  ) {}

  getWhere(query: StatisticsQuery) {
    const userEntity = this.request.userEntity;
    const where: any = {};

    if (userEntity.company?.id) {
      where.companyId = userEntity.company.id;
    }

    if (query.where?.customerId) {
      where.customerId = query.where.customerId;
    }

    if (query.where?.createTimeStart && query.where?.createTimeEnd) {
      where.createTime = Between(
        new Date(query.where.createTimeStart),
        new Date(query.where.createTimeEnd)
      );
    }

    if (!query.where?.showCancelOrders) {
      where.status = In([OrderStatus.PAYED.toString(), OrderStatus.UNPAYED.toString()]);
    }

    return where;
  }

  async totalCustomerAmount(
    query: StatisticsQuery
  ): Promise<TotalAmountView[] | undefined> {
    const where = this.getWhere(query);

    return await this.repo
      .createQueryBuilder("totalAmountView")
      .select("COUNT(distinct totalAmountView.customerId)", "totalCount")
      .where({
        ...where,
      })
      .getRawMany();
  }

  async totalAmount(
    query: StatisticsQuery
  ): Promise<TotalAmountView[] | undefined> {
    const where = this.getWhere(query);

    return await this.repo
      .createQueryBuilder("totalAmountView")
      .select("totalAmountView.companyId", "companyId")
      .addSelect("SUM(totalAmountView.totalPrice)", "totalAmount")
      .addSelect("COUNT(totalAmountView.no)", "totalCount")
      .addSelect("COUNT(distinct totalAmountView.customerId)", "customerCount")
      .groupBy("totalAmountView.companyId")
      .where({
        ...where,
      })
      .getRawMany();
  }

  async totalAmountGroupByCustomer(
    query: StatisticsQuery
  ): Promise<TotalAmountView[]> {
    const where = this.getWhere(query);

    return await this.repo
      .createQueryBuilder("totalAmountView")
      .select("totalAmountView.customerId", "customerId")
      .select("totalAmountView.fullname", "fullname")
      .addSelect("SUM(totalAmountView.totalPrice)", "totalAmount")
      .groupBy("totalAmountView.customerId")
      .groupBy("totalAmountView.fullname")
      .where({ ...where })
      .getRawMany();
  }

  async totalAmountGroupByTime(
    query: StatisticsQuery
  ): Promise<TotalAmountView[]> {
    const where = this.getWhere(query);

    return await this.repo
      .createQueryBuilder("totalAmountView")
      .select("DATE(totalAmountView.createTime)", "createTime")
      .addSelect("SUM(totalAmountView.totalPrice)", "totalAmount")
      .addSelect("COUNT(totalAmountView.no)", "totalCount")
      .groupBy("DATE(totalAmountView.createTime)")
      .where({ ...where })
      .getRawMany();
  }

  async totalAmountGroupByStatus(
    query: StatisticsQuery
  ): Promise<TotalAmountView[]> {
    const where = this.getWhere(query);

    return await this.repo
      .createQueryBuilder("totalAmountView")
      .select("totalAmountView.status", "status")
      .addSelect("SUM(totalAmountView.totalPrice)", "totalAmount")
      .groupBy("totalAmountView.status")
      .where({ ...where })
      .getRawMany();
  }
}
