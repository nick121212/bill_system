import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsString,
} from "class-validator";

import { BaseQuery } from "@/common/interfaces/query";

export class OrderProduct {
  @IsNumber()
  productId: number;
  @IsNumber()
  price: number;
  @IsNumber()
  count: number;
  @IsNumber()
  discount: number;
}

export class OrderCategory {
  @IsString()
  name: string;

  @IsNumber()
  productCategoryId: number;

  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  products: OrderProduct[];
}

export class OrderRequest {
  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsNumber()
  totalPrice: number;

  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  categories: OrderCategory[];
}

export class OrderQuery extends BaseQuery {}
