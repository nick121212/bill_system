import { IsArray, IsString } from 'class-validator';

import { BaseQuery } from '@/common/interfaces/query';

export class ProductCategoryRequest {
  @IsString()
  name: string;

  @IsString()
  label: string;

  @IsString()
  desc: string;

  @IsArray()
  products: number[];
}

export class ProductCategoryQuery extends BaseQuery {}

export class ProductCategoryProductWhere {
  categoryId: number;
  name?: string;
  productId?: number;
}

export class ProductCategoryProductQuery extends BaseQuery<ProductCategoryProductWhere> {}
