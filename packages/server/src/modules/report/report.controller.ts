import { ReportEntity, Role } from '@bill/database';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { Roles } from '@/common/decorators/roles.decorator';
import { Log4jsService } from '@/modules/log4js';

import { ReportQuery, ReportRequest } from './report.interface';
import { ReportService } from './report.service';

@Controller({
  path: ['reports'],
})
@Roles(Role.User)
export class ReportController {
  constructor(
    private reportService: ReportService,
    private readonly log4jService: Log4jsService,
  ) {}

  @Get('/')
  async all(@Query() query: ReportQuery) {
    return this.reportService.all(query);
  }

  @Get('/:id')
  // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
  async one(@Param('id') id: number): Promise<ReportEntity | null> {
    return this.reportService.getById(id);
  }

  @Post('/')
  async create(@Body() body: ReportRequest): Promise<ReportEntity> {
    return this.reportService.create(body);
  }

  @Delete('/:id')
  async remove(@Param('id') id: number): Promise<ReportEntity> {
    return this.reportService.remove(id);
  }
}
