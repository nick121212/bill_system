import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { MenuService } from "@/modules/menu/menu.service";

import { CustomerController } from "./customer.controller";
import { CustomerService } from "./customer.service";

@Module({
  controllers: [CustomerController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [CustomerService],
  exports: [CustomerService],
})
export class CustomerModule {}
