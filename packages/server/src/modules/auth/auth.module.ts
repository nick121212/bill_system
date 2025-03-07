import { UserEntity } from '@bill/database/dist/entities';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import jwtConfig from '@/config/jwt.config';
import { UserService } from '@/modules/user/user.service';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { BcryptService } from './bcrypt.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [AuthService, BcryptService,UserService],
  exports: [JwtModule],
})
export class AuthModule {}
