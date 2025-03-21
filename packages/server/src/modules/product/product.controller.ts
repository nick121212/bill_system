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

import { ProductBodyRequest, ProductQuery } from "./product.interface";
import { ProductService } from "./product.service";

@Controller({
  path: ["products"],
})
@Roles(Role.User)
export class ProductController {
  constructor(
    private productService: ProductService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(@Query() query: ProductQuery, @ActiveUser() user: ActiveUserData) {
    return this.productService.all(query, user);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.productService.getById(id);
  }

  @Post("/")
  async create(
    @Body() body: ProductBodyRequest,
    @ActiveUser() user: ActiveUserData
  ) {
    return this.productService.create(body, user);
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
