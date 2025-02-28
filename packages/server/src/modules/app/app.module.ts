import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import entities from "@bill/database";

import database from "@/config/database";
import base from "@/config/base";
import { AuthModule } from "@/modules/auth/auth.module";
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
        console.log(config.get("database"));
        return Object.assign(
          {
            entities: entities || [],
            synchronize: true,
          },
          config.get("database")
        );
      },
      inject: [ConfigService],
    }),
    UserModule,
    AuthModule,
  ],
  providers: [],
})
export class AppModule {}
