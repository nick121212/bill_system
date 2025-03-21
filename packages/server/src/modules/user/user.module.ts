import entities from "@bill/database";
import { Global, Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";

import { RolesGuard } from "@/common/guard/role.guard";

import { CompanyService } from "../company/company.service";
import { MenuService } from "../menu/menu.service";
import { RoleService } from "../role/role.service";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";

console.log(entities);

@Module({
  controllers: [UserController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [
    UserService,
    CompanyService,
    RoleService,
    MenuService,
  ],
  exports: [UserService],
})
@Global()
export class UserModule {}
