import entities from '@bill/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ProductCategoryService } from '@/modules/productCategory/category.service';
import { ProductUnitService } from '@/modules/productUnit/unit.service';

import { ProductController } from './product.controller';
import { ProductService } from './product.service';

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ProductService, ProductCategoryService, ProductUnitService],
  exports: [ProductService],
  controllers: [ProductController],
})
export class ProductModule {}
