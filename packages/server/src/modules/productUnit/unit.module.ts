import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductUnitController } from "./unit.controller";
import { ProductUnitService } from "./unit.service";

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ProductUnitService],
  exports: [ProductUnitService],
  controllers: [ProductUnitController],
})
export class ProductUnitModule {}
