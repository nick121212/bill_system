import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsString,
} from "class-validator";

import { BaseQuery } from "@/utils/query";

export class TemplateCategory {
  @IsNumber()
  productCategoryId: number;
  @ArrayMinSize(1)
  @ArrayMaxSize(100)
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

  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  categories: TemplateCategory[];
}

export class TemplateQuery extends BaseQuery {}
