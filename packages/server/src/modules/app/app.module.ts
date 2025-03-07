import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { TypeOrmModule } from "@nestjs/typeorm";

import base from "@/config/base";
import database from "@/config/database";
import { AuthModule } from "@/modules/auth/auth.module";
import { Log4jsGlobalModule } from "@/modules/log4js/log4js.module";
import { MenuModule } from "@/modules/menu/menu.module";
import { ProductModule } from "@/modules/product/product.module";
import { ProductCategoryModule } from "@/modules/productCategory/category.module";
import { ProductUnitModule } from "@/modules/productUnit/unit.module";
import { TemplateModule } from "@/modules/template/template.module";
import { UserModule } from "@/modules/user/user.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: [".env"],
      load: [database, base],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => {
        return Object.assign(
          {
            entities: entities || [],
            synchronize: true,
          },
          config.get("database"),
          {
          }
        );
      },
      inject: [ConfigService],
    }),
    Log4jsGlobalModule.forRoot(),
    UserModule,
    AuthModule,
    MenuModule,
    TemplateModule,
    ProductModule,
    ProductCategoryModule,
    ProductUnitModule
  ],
  providers: [],
})
export class AppModule {}
