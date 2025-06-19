import { IsNumber } from 'class-validator';

import { BaseQuery } from '@/common/interfaces/query';

class ChargeSearchModel {
  user?: {
    id: number;
  };
}

export class ChargeQuery extends BaseQuery<ChargeSearchModel> {}

export class ChargeRequest {
  @IsNumber()
  customerId: number;

  @IsNumber()
  balance: number;

  @IsNumber()
  extra: number;
}
