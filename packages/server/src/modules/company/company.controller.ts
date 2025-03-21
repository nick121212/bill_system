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

import { CompanyQuery, CompanyRequest } from "./company.interface";
import { CompanyService } from "./company.service";

@Controller({
  path: ["companies"],
})
@Roles(Role.Admin)
export class CompanyController {
  constructor(
    private roleService: CompanyService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(@Query() query: CompanyQuery) {
    return this.roleService.all(query);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.roleService.getById(id);
  }

  @Post("/")
  async create(@Body() body: CompanyRequest) {
    return this.roleService.create(body);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: CompanyRequest) {
    return this.roleService.update(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.roleService.remove(id);
  }
}
