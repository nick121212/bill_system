import { Redis } from 'ioredis';
import { Global, Module, OnApplicationShutdown, Scope } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ModuleRef } from '@nestjs/core';

import { IORedisKey } from './redis.constants';
import { RedisService } from './redis.service';

@Global()
@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: IORedisKey,
      useFactory: (configService: ConfigService) => {
        return new Redis(configService.get<any>('redis'));
      },
      inject: [ConfigService],
    },
    RedisService,
  ],
  exports: [RedisService],
})
export class RedisModule implements OnApplicationShutdown {
  constructor(private readonly moduleRef: ModuleRef) {}

  async onApplicationShutdown(): Promise<void> {
    return new Promise<void>((resolve) => {
      const redis = this.moduleRef.get(IORedisKey);

      redis.quit();
      redis.on('end', () => {
        resolve();
      });
    });
  }
}
