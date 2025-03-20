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

import { ActiveUser } from "@/common/decorators/active-user.decorator";
import { Roles } from "@/common/decorators/roles.decorator";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import { Log4jsService } from "@/modules/log4js";

import { ProductUnitBodyRequest, ProductUnitQuery } from "./unit.interface";
import { ProductUnitService } from "./unit.service";

@Controller({
  path: ["product/units"],
})
@Roles(Role.User)
export class ProductUnitController {
  constructor(
    private ProductUnitService: ProductUnitService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(
    @Query() query: ProductUnitQuery,
    @ActiveUser() user: ActiveUserData
  ) {
    return this.ProductUnitService.all(query, user);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.ProductUnitService.getById(id);
  }

  @Post("/")
  async create(
    @Body() body: ProductUnitBodyRequest,
    @ActiveUser() user: ActiveUserData
  ) {
    return this.ProductUnitService.create(body, user);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: ProductUnitBodyRequest) {
    return this.ProductUnitService.update(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.ProductUnitService.remove(id);
  }
}
