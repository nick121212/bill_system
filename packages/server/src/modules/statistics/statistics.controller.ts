import { Role } from "@bill/database";
import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
} from "@nestjs/common";

import { Roles } from "@/common/decorators/roles.decorator";
import { Log4jsService } from "@/modules/log4js";

import { StatisticsQuery } from "./statistics.interface";
import { StatisticsService   } from "./statistics.service";

@Controller({
  path: ["statistics"],
})
@Roles(Role.Admin)
export class StatisticsController {
  constructor(
    private roleService: StatisticsService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/totalAmount")
  async all(@Query() query: StatisticsQuery) {
    return this.roleService.all(query);
  }
}
