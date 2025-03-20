import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RolesGuard } from "@/common/guard/role.guard";

import { MenuController } from "./menu.controller";
import { MenuService } from "./menu.service";

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [MenuService],
  exports: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
