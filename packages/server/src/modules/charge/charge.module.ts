import entities from '@bill/database';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ChargeController } from './charge.controller';
import { ChargeService } from './charge.service';

@Module({
  controllers: [ChargeController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ChargeService],
  exports: [ChargeService],
})
@Global()
export class ChargeModule {}
