import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MenuService } from "@/modules/menu/menu.service";

import { CompanyController } from "./company.controller";
import { CompanyService } from "./company.service";

@Module({
  controllers: [CompanyController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [
    CompanyService,
    MenuService,
  ],
  exports: [CompanyService],
})
export class CompanyModule {}
