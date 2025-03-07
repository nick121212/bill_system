import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { UserController } from "./user.controller";
import { UserService } from "./user.service";

@Module({
  controllers:[UserController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
