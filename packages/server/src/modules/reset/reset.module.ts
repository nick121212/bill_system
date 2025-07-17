import entities from '@bill/database';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ResetController } from './reset.controller';
import { ResetService } from './reset.service';

@Module({
  controllers: [ResetController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ResetService],
  exports: [ResetService],
})
export class ResetModule {}
