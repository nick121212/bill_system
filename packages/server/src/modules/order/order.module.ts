import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { ProductService } from "@/modules/product/product.service";
import { ProductCategoryService } from "@/modules/productCategory/category.service";
import { ProductUnitService } from "@/modules/productUnit/unit.service";

import { OrderController } from "./order.controller";
import { OrderService } from "./order.service";

@Module({
  controllers: [OrderController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [
    OrderService,
    ProductCategoryService,
    ProductService,
    ProductUnitService,
  ],
  exports: [OrderService],
})
export class OrderModule {}
