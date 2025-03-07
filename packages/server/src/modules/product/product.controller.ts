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

import { Log4jsService } from "@/modules/log4js";

import { ProductBodyRequest, ProductQuery } from "./product.interface";
import { ProductService } from "./product.service";

@Controller({
  path: ["products"],
})
export class ProductController {
  constructor(
    private productService: ProductService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(@Query() query: ProductQuery) {
    return this.productService.all(query);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.productService.getById(id);
  }

  @Post("/")
  async create(@Body() body: ProductBodyRequest) {
    return this.productService.create(body);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: ProductBodyRequest) {
    return this.productService.update(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.productService.remove(id);
  }
}
