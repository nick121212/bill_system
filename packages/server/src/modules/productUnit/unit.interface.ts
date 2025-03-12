import { IsNumber, IsString, Max, Min } from "class-validator";

import { BaseQuery } from "@/common/interfaces/query";

export class ProductUnitBodyRequest {
  id?: number;

  @IsString()
  name: string;

  @IsString()
  label: string;

  @IsString()
  desc: string;
}

export class ProductUnitQuery extends BaseQuery {

}

