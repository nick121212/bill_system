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

  skip_c() {
    return this.skip || 0;
  }

  take_c() {
    return this.take || 10;
  }

  where_c() {
    return this.where || {};
  }
}

