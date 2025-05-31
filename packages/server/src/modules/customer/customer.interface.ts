import { Type } from "class-transformer";
import { IsArray, IsNumber, IsString } from "class-validator";
import { DeliverType } from "@bill/database";

import { BaseQuery } from "@/common/interfaces/query";

export class CustomerRequest {
  @IsString()
  fullname: string;

  @IsString()
  contact: string;

  @IsString()
  phone: string;

  @IsString()
  email: string;

  @IsNumber()
  paytime: number;

  @IsString()
  address: string;

  @IsNumber()
  deliver: DeliverType;

  @IsNumber()
  level: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  template: number;

  @IsString()
  no: string;

  @IsString()
  desc: string;
}

export class CustomerPrice {
  @IsNumber()
  price: number;

  @IsNumber()
  discount: number;

  @IsNumber()
  productId: number;
}

export class CustomerPriceRequest {
  @IsArray()
  prices: CustomerPrice[];
}

export class CustomerWhere {
    @IsString()
    fullname?: string;

    @IsString()
    phone?: string;
}

export class CustomerQuery extends BaseQuery<CustomerWhere> {
  @Type(() => CustomerWhere)
  declare where?: CustomerWhere;
}
