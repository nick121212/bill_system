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
import { ActiveUserData } from "@/common/interfaces/active-user-data.interface";
import { Log4jsService } from "@/modules/log4js";

import { TemplateBodyRequest, TemplateQuery } from "./template.interface";
import { TemplateService } from "./template.service";

@Controller({
  path: ["templates"],
})
export class MenuController {
  constructor(
    private templateService: TemplateService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(@Query() query: TemplateQuery, @ActiveUser() user: ActiveUserData) {
    return this.templateService.all(query, user);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.templateService.getById(id);
  }

  @Get("/:id/categories")
  async oneWithCategories(@Param("id") id: number) {
    return this.templateService.getByIdWithCategories(id);
  }

  @Post("/")
  async create(
    @Body() body: TemplateBodyRequest,
    @ActiveUser() user: ActiveUserData
  ) {
    return this.templateService.create(body, user);
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
