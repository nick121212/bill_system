import {
  IsNumber,
  isString,
  IsString,
  Length,
  Max,
  Min,
} from "class-validator";
import { PermissionType } from "@bill/database";
import {
  ProductCategoryEntity,
  TemplateCategoryEntity,
} from "@bill/database/dist/entities";

import { BaseQuery } from "@/utils/query";

export class TemplateCategory {
  @IsNumber()
  productCategoryId: number;
  @Length(1)
  products: number[];
}

export class TemplateBodyRequest {
  id?: number;

  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsNumber()
  status: number;

  @Length(1)
  categories: TemplateCategory[];
}

export class TemplateQuery extends BaseQuery {}
