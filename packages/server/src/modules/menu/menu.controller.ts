import { Controller, Request, Get, Post, Body, Param } from "@nestjs/common";

import { Public } from "@/decorator/public";
import { Log4jsService } from "@/modules/log4js";

import { MenuBodyRequest } from "./menu.interface";
import { MenuService } from "./menu.service";

@Controller({
  path: ["menus"],
})
export class MenuController {
  constructor(private menuService: MenuService, private readonly log4jService: Log4jsService) {
    this.log4jService.warn("abc");
  }

  @Public()
  @Get("/")
  async tree(@Request() req) {
    return this.menuService.all();
  }

  @Public()
  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.menuService.getById(id);
  }

  @Public()
  @Post("/")
  async create(@Body() body: MenuBodyRequest) {
    return this.menuService.create(body);
  }

  @Public()
  @Get("/test")
  async test(@Request() req) {
    return this.menuService.testData();
  }
}
