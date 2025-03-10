import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RoleService } from "@/modules/role/role.service";

import { MenuService } from "../menu/menu.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UserService, RoleService, MenuService],
  exports: [UserService],
})
export class UserModule {}
