import { Role } from "@bill/database";
import { Controller, Request, Get, Post, Body, Param, Put, Delete } from "@nestjs/common";

import { Roles } from "@/common/decorators/roles.decorator";
import { Log4jsService } from "@/modules/log4js";

import { MenuBodyRequest } from "./menu.interface";
import { MenuService } from "./menu.service";

@Controller({
  path: ["menus"],
})
@Roles(Role.Admin)
export class MenuController {
  constructor(private menuService: MenuService, private readonly log4jService: Log4jsService) {
    this.log4jService.warn("abc");
  }

  @Get("/")
  async tree(@Request() req) {
    return this.menuService.all();
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.menuService.getById(id);
  }

  @Post("/")
  async create(@Body() body: MenuBodyRequest) {
    return this.menuService.create(body);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: MenuBodyRequest) {
    return this.menuService.update(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.menuService.remove(id);
  }
}
