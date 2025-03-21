import entities from "@bill/database";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MenuService } from "@/modules/menu/menu.service";
import { ProductModule } from "@/modules/product/product.module";

import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";

@Module({
  controllers: [CustomerController],
  imports: [TypeOrmModule.forFeature(entities), ProductModule],
  providers: [CustomerService],
  exports: [CustomerService],
})
@Global()
export class CustomerModule {}
