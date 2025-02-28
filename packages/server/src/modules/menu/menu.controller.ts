import { Controller, Request, Post, UseGuards, Get } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";

import { MenuService } from "./menu.service";
import { Public } from "@/decorator/public";

@Controller({
  path: ["menus"],
})
export class MenuController {
  constructor(private menuService: MenuService) {}

  @Public()
  @Get("/")
  async login(@Request() req) {
    return this.menuService.all();
  }

  @Public()
  @Get("/test")
  async test(@Request() req) {
    return this.menuService.testData();
  }
}
