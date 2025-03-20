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

import { Public } from "@/common/decorators/public.decorator";
import { Roles } from "@/common/decorators/roles.decorator";
import { Log4jsService } from "@/modules/log4js";

import { RoleQuery, RoleRequest } from "./role.interface";
import { RoleService } from "./role.service";

@Controller({
  path: ["roles"],
})
@Roles(Role.Admin)
export class RoleController {
  constructor(
    private roleService: RoleService,
    private readonly log4jService: Log4jsService
  ) {}

  @Get("/")
  async all(@Query() query: RoleQuery) {
    return this.roleService.all(query);
  }

  @Get("/:id")
  async one(@Param("id") id: number) {
    return this.roleService.getById(id);
  }

  @Get("/:id/permission")
  async oneAndMenus(@Param("id") id: number) {
    return this.roleService.getByIdWithPermission(id);
  }

  @Post("/")
  async create(@Body() body: RoleRequest) {
    return this.roleService.create(body);
  }

  @Put("/:id")
  async update(@Param("id") id: number, @Body() body: RoleRequest) {
    return this.roleService.update(id, body);
  }

  @Delete("/:id")
  async remote(@Param("id") id: number) {
    return this.roleService.remove(id);
  }
}
