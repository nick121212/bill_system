import entities from '@bill/database';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import jwtConfig from '@/config/jwt.config';
import { MenuService } from '@/modules/menu/menu.service';
import { RoleService } from '@/modules/role/role.service';
import { UserService } from '@/modules/user/user.service';

import { CompanyService } from '../company/company.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature(entities),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    BcryptService,
    UserService,
    RoleService,
    MenuService,
    CompanyService,
  ],
  exports: [JwtModule],
})
export class AuthModule {}
