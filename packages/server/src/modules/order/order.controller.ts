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
  Req,
  Res,
} from "@nestjs/common";

import { ActiveUser } from "@/common/decorators/active-user.decorator";
import { Public } from "@/common/decorators/public.decorator";
import { Roles } from "@/common/decorators/roles.decorator";
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";

import {
  OrderQuery,
  OrderRequest,
} from "./order.interface";
import { OrderService } from "./order.service";

@Controller({
  path: ["orders"],
})
@Roles(Role.User)
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Get("/")
  async all(@Query() query: OrderQuery, @ActiveUser() user: ActiveUserData) {
    return this.orderService.all(query, user);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.orderService.getById(id);
  }

  @Get("/:id/categories")
  async oneWithCategories(@Param("id") id: number) {
    return this.orderService.getByIdWithCategories(id);
  }

  @Post("/")
  async create(
    @Body() body: OrderRequest,
    @ActiveUser() user: ActiveUserData
  ) {
    return this.orderService.create(body, user);
  }

  @Put("/:id")
  async update(
    @Param("id") id: number,
    @Body() body: OrderRequest,
    @ActiveUser() user: ActiveUserData
  ) {
    return this.orderService.update(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.orderService.remove(id);
  }
}
