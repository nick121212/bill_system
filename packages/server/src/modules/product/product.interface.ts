import { IsNumber, IsString, Max, Min } from "class-validator";

import { BaseQuery } from "@/common/interfaces/query";

export class ProductBodyRequest {
  id?: number;

  @IsString()
  name: string;

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
  categoryId: number;

  @IsNumber()
  unitId: number;
}

export class ProductQuery extends BaseQuery<{
  name?: string;
  excludeIds?: number[];
}> {}
