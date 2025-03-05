import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MenuController } from "./template.controller";
import { TemplateService } from "./template.service";

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [TemplateService],
  exports: [TemplateService],
  controllers: [MenuController],
})
export class TemplateModule {}
