import { IsNumber, IsString, Length, Max, Min } from "class-validator";
import { PermissionType } from "@bill/database";

import { BaseQuery } from "@/utils/query";

export class ProductCategoryRequest {
  @IsString()
  name: string;

  @IsString()
  label: string;

  @IsString()
  desc: string;
}

export class ProductCategoryQuery extends BaseQuery {}
