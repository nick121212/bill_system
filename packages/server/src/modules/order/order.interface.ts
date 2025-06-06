import {
  ArrayMaxSize,
  ArrayMinSize,
  IsDate,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";
import { OrderStatus } from "@bill/database/dist/enums/OrderStatus";

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
  no: string;

  @IsString()
  desc: string;

  @IsNumber()
  customerId?: number;

  totalPrice?: number;

  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  categories: OrderCategory[];
}

export class OrderStatusRequest {
  @IsNumber()
  @Max(2)
  @Min(0)
  status?: OrderStatus;
}

export class OrderWhere {
  @IsDate()
  startDate?: Date;
  
  @IsDate()
  endDate?: Date;

  @IsNumber()
  customerId?: number;

  @IsNumber()
  status?: OrderStatus;

  @IsString()
  no?: string;
}

export class OrderQuery extends BaseQuery<OrderWhere> {}
