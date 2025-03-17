import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CompanyService } from "../company/company.service";
import { MenuService } from "../menu/menu.service";
import { RoleService } from "../role/role.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

console.log(entities);


@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UserService, CompanyService, RoleService, MenuService],
  exports: [UserService],
})
export class UserModule {}
