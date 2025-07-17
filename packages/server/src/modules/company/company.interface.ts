import { IsString } from 'class-validator';

import { BaseQuery } from '@/common/interfaces/query';

export class CompanyRequest {
  @IsString()
  name: string;
  @IsString()
  address?: string;
  @IsString()
  phone: string;
}

export class CompanyQuery extends BaseQuery {}
