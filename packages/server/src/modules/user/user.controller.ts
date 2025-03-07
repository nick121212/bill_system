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

import { UserQuery, UserRequest } from "./user.interface";
import { UserService } from "./user.service";

@Controller({
  path: ["users"],
})
export class UserController {
  constructor(
    private userService: UserService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(@Query() query: UserQuery) {
    return this.userService.all(query);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.userService.getById(id);
  }

  @Post("/")
  async create(@Body() body: UserRequest) {
    return this.userService.create(body);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: UserRequest) {
    return this.userService.update(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.userService.remove(id);
  }
}
