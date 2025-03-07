import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductCategoryController } from "./category.controller";
import { ProductCategoryService } from "./category.service";

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ProductCategoryService],
  exports: [ProductCategoryService],
  controllers: [ProductCategoryController],
})
export class ProductCategoryModule {}
