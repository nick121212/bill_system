import { Controller, Request, Get } from "@nestjs/common";

import { Public } from "@/decorator/public";

import { MenuService } from "./menu.service";

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
