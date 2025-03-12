import { Type } from "class-transformer";
import {
  IsBoolean,
  isBoolean,
  IsEmail,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

import { BaseQuery } from "@/common/interfaces/query";

export class UserRequest {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  avatar?: string;

  @IsString()
  address?: string;

  @IsNumber()
  company: number;

  @IsString()
  password: string;

  @IsNumber()
  validateDate?: number;

  @IsBoolean()
  isActive?: boolean;

  @IsNumber()
  role: number;
}

class UserSearchModel {
  @Type(() => Boolean)
  isActive?: boolean;
  @Type(() => String)
  name?: string;

  role?: {
    id: number;
  };
}

export class UserQuery extends BaseQuery<UserSearchModel> {}
