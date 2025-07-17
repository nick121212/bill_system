import {
  IsNumber,
  IsString,
} from "class-validator";

import { BaseQuery } from "@/common/interfaces/query";
import { MenuBodyRequest } from "@/modules/menu/menu.interface";

export class RoleRequest {
  @IsString()
  name: string;
  @IsString()
  label: string;
  @IsString()
  desc: string;
  @IsNumber()
  order: number;
  @IsNumber()
  status: number;
  
  menus?: number[];
}

export class RoleQuery extends BaseQuery {}
