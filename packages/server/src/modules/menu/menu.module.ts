import { Module } from "@nestjs/common";
import { MenuService } from "./menu.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "@bill/database";

import { MenuController } from "./menu.controller";

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [MenuService],
  exports: [MenuService],
  controllers: [MenuController],
})
export class MenuModule {}
