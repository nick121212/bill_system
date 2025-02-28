import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import entities from "@bill/database";

@Module({
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
