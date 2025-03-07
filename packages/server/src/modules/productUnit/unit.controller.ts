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

import { Public } from "@/decorator/public";
import { Log4jsService } from "@/modules/log4js";

import { ProductUnitBodyRequest, ProductUnitQuery } from "./unit.interface";
import { ProductUnitService } from "./unit.service";

@Controller({
  path: ["product/units"],
})
@Public()
export class ProductUnitController {
  constructor(
    private ProductUnitService: ProductUnitService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(@Query() query: ProductUnitQuery) {
    return this.ProductUnitService.all(query);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.ProductUnitService.getById(id);
  }

  @Post("/")
  async create(@Body() body: ProductUnitBodyRequest) {
    return this.ProductUnitService.create(body);
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
