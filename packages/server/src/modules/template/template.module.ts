import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductService } from "@/modules/product/product.service";
import { ProductCategoryService } from "@/modules/productCategory/category.service";
import { ProductUnitService } from "@/modules/productUnit/unit.service";

import { MenuController } from "./template.controller";
import { TemplateService } from "./template.service";

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [TemplateService, ProductCategoryService, ProductService, ProductUnitService],
  exports: [TemplateService],
  controllers: [MenuController],
})
export class TemplateModule {}
