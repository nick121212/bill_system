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

import { ProductCategoryRequest, ProductCategoryQuery } from "./category.interface";
import { ProductCategoryService} from "./category.service";

@Controller({
  path: ["product/categories"],
})
@Public()
export class ProductCategoryController {
  constructor(
    private productCategoryService: ProductCategoryService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(@Query() query: ProductCategoryQuery) {
    return this.productCategoryService.all(query);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.productCategoryService.getById(id);
  }

  @Post("/")
  async create(@Body() body: ProductCategoryRequest) {
    return this.productCategoryService.create(body);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: ProductCategoryRequest) {
    return this.productCategoryService.update(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.productCategoryService.remove(id);
  }
}
