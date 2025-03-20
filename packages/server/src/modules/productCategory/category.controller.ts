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

import {
  ProductCategoryRequest,
  ProductCategoryQuery,
} from "./category.interface";
import { ProductCategoryService } from "./category.service";

@Controller({
  path: ["product/categories"],
})
@Roles(Role.User)
export class ProductCategoryController {
  constructor(
    private productCategoryService: ProductCategoryService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(
    @Query() query: ProductCategoryQuery,
    @ActiveUser() user: ActiveUserData
  ) {
    return this.productCategoryService.all(query, user);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.productCategoryService.getById(id);
  }

  @Post("/")
  async create(
    @Body() body: ProductCategoryRequest,
    @ActiveUser() user: ActiveUserData
  ) {
    return this.productCategoryService.create(body, user);
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
