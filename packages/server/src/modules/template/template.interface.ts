import {
  ArrayMaxSize,
  ArrayMinSize,
  IsNumber,
  IsString,
} from "class-validator";

import { BaseQuery } from "@/common/interfaces/query";

export class TemplateCategoryProduct {
  @IsNumber()
  productId: number;

  @IsNumber()
  productCategoryId: number;

  @IsNumber()
  id: number;
  @IsNumber()
  price: number;
  @IsNumber()
  count: number;
  @IsNumber()
  times: number;
}

export class TemplateCategory {
  @IsString()
  name: string;

  @ArrayMinSize(1)
  @ArrayMaxSize(100)
  products: TemplateCategoryProduct[];
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

export class TemplateQuery extends BaseQuery {
  ids?: number[];
}
