import { BaseQuery } from '@/common/interfaces/query';

class ChargeSearchModel {
  user?: {
    id: number;
  };
}

export class ChargeQuery extends BaseQuery<ChargeSearchModel> {}
