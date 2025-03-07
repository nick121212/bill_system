import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MenuService } from "@/modules/menu/menu.service";

import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";

@Module({
  controllers: [RoleController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [RoleService, MenuService],
  exports: [RoleService],
})
export class RoleModule {}
