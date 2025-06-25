import { IsNumber, IsString } from 'class-validator';

import { BaseQuery } from '@/common/interfaces/query';

export class ProductBodyRequest {
  @IsString()
  name: string;

  @IsString()
  sku?: string;

  @IsString()
  label: string;

  @IsString()
  desc: string;

  @IsNumber({
    maxDecimalPlaces: 2,
  })
  price: number;

  @IsNumber()
  cost: number;

  @IsNumber()
  unitId: number;

  @IsNumber()
  stock?: number;
}

export class ProductQuery extends BaseQuery<{
  name?: string;
  excludeIds?: number[];

  productId?: number;
}> {}
