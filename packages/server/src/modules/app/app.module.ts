import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { JwtModule } from "@nestjs/jwt";
// import base from "@/config1/base";
// import database from "@/config1/database";
import { TypeOrmModule } from "@nestjs/typeorm";

import appConfig from "@/config/app.config";
import databaseConfig from "@/config/database.config";
import { validate } from '@/config/env.validation';
import jwtConfig from "@/config/jwt.config";
import redisConfig from "@/config/redis.config";
import { AuthModule } from "@/modules/auth/auth.module";
import { JwtAuthGuard } from "@/modules/auth/guards/jwt-auth.guard";
import { CompanyModule } from "@/modules/company/company.module";
import { CustomerModule } from "@/modules/customer/customer.module";
import { Log4jsGlobalModule } from "@/modules/log4js/log4js.module";
import { MenuModule } from "@/modules/menu/menu.module";
import { ProductModule } from "@/modules/product/product.module";
import { ProductCategoryModule } from "@/modules/productCategory/category.module";
import { ProductUnitModule } from "@/modules/productUnit/unit.module";
import { RedisModule } from "@/modules/redis/redis.module";
import { RoleModule } from "@/modules/role/role.module";
import { TemplateModule } from "@/modules/template/template.module";
import { UserModule } from "@/modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      load: [appConfig, databaseConfig, jwtConfig, redisConfig],
      isGlobal: true,
      validate
    }),
    JwtModule.registerAsync({
      useFactory: (configService: ConfigService) => {
        return {
          global: true,
          secret: configService.get("jwt").secret,
          signOptions: { expiresIn: "60s" },
        };
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (configService: ConfigService) => {
        return Object.assign(
          {
            entities: entities || [],
            synchronize: true,
          },
          configService.get("database"),
          {}
        );
      },
      inject: [ConfigService],
    }),
    RedisModule,
    Log4jsGlobalModule.forRoot(),
    UserModule,
    AuthModule,
    MenuModule,
    TemplateModule,
    ProductModule,
    ProductCategoryModule,
    ProductUnitModule,
    RoleModule,
    CompanyModule,
    CustomerModule
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],})
export class AppModule {}
