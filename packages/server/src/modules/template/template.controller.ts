import { Controller, Request, Get, Post, Body, Param, Put, Delete, Query } from "@nestjs/common";

import { Public } from "@/decorator/public";
import { Log4jsService } from "@/modules/log4js";

import { TemplateBodyRequest, TemplateQuery } from "./template.interface";
import { TemplateService } from "./template.service";

@Controller({
  path: ["templates"],
})
@Public()
export class MenuController {
  constructor(private templateService: TemplateService, private readonly log4jService: Log4jsService) {
    
  }

  @Get("/")
  async all(@Query() query: TemplateQuery) {
    return this.templateService.all(query);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.templateService.getById(id);
  }

  @Post("/")
  async create(@Body() body: TemplateBodyRequest) {
    return this.templateService.create(body);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: TemplateBodyRequest) {
    return this.templateService.update(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.templateService.remove(id);
  }
}
