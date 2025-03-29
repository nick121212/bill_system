import { Role } from "@bill/database";
import {
  Controller,
  Get,
  Query,
} from "@nestjs/common";

import { Roles } from "@/common/decorators/roles.decorator";
import { Log4jsService } from "@/modules/log4js";

import { StatisticsQuery } from "./statistics.interface";
import { StatisticsService } from "./statistics.service";

@Controller({
  path: ["statistics"],
})
@Roles(Role.Admin)
export class StatisticsController {
  constructor(
    private roleService: StatisticsService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(@Query() query: StatisticsQuery) {
    return {
      totalAmount: await this.roleService.totalAmount(query),
      totalAmountGroupByCustomer: await this.roleService.totalAmountGroupByCustomer(query),
      totalAmountGroupByStatus: await this.roleService.totalAmountGroupByStatus(query),
    };
  }

  @Get("/totalAmount")
  async totalAmount(@Query() query: StatisticsQuery) {
    return this.roleService.totalAmount(query);
  }

  @Get("/totalAmountGroupByCustomer")
  async totalAmountGroupByCustomer(@Query() query: StatisticsQuery) {
    return this.roleService.totalAmountGroupByCustomer(query);
  }

  @Get("/totalAmountGroupByStatus")
  async totalAmountGroupByStatus(@Query() query: StatisticsQuery) {
    return this.roleService.totalAmountGroupByStatus(query);
  }
}
