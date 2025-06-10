import { Type } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';
import { ReportType } from '@bill/database';

import { BaseQuery } from '@/common/interfaces/query';

export class ReportRequest {
  @IsString()
  name: string;

  @IsString()
  label: string;

  @IsNumber()
  type: ReportType;
}

class ReportSearchModel {
  @Type(() => String)
  name?: string;
}

export class ReportQuery extends BaseQuery<ReportSearchModel> {}
