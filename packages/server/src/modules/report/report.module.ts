import entities from "@bill/database";
import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { CompanyService } from "../company/company.service";
import { ReportController } from "./report.controller";
import { ReportService } from "./report.service";

@Module({
  controllers: [ReportController],
  imports: [TypeOrmModule.forFeature(entities)],
  providers: [ReportService, CompanyService],
  exports: [ReportService],
})
@Global()
export class ReportModule {}
