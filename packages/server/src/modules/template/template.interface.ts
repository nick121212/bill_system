import { IsNumber, isString, IsString, Max, Min } from "class-validator";
import { PermissionType } from "@bill/database";

import { BaseQuery } from "@/utils/query";

export class TemplateBodyRequest {
  id?: number;

  @IsString()
  name: string;

  @IsString()
  desc: string;

  @IsNumber()
  status: number;

}

export class TemplateQuery extends BaseQuery{
  
  
}
