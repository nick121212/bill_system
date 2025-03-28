import entities from "@bill/database";
import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { StatisticsController } from "./statistics.controller";
import { StatisticsService } from "./statistics.service";

@Module({
  controllers: [StatisticsController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [StatisticsService],
  exports: [StatisticsService],
})
export class StatisticsModule {}
