import { Type } from "class-transformer";
import { IsDate, IsNumber } from "class-validator";

import { BaseQuery } from "@/common/interfaces/query";

export class StatisticsRequest {}

export class StatisticsWhere {
  @Type(() => Number)
  @IsNumber()
  customerId: number;
  @Type(() => Number)
  @IsNumber()
  companyId: number;
  @Type(() => Date)
  @IsDate()
  createTimeStart: Date;
  @Type(() => Date)
  @IsDate()
  createTimeEnd: Date;
}

export class StatisticsQuery extends BaseQuery<StatisticsWhere> {
   @Type(() => StatisticsWhere)
   declare where?: StatisticsWhere;
}
