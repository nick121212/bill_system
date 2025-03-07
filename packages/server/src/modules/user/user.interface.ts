import {
  IsBoolean,
  isBoolean,
  IsEmail,
  IsNumber,
  IsString,
  Max,
  Min,
} from "class-validator";

import { BaseQuery } from "@/utils/query";

export class UserRequest {
  @IsString()
  fullname: string;

  @IsEmail()
  email: string;

  @IsString()
  avatar?: string;

  @IsString()
  address?: string;

  @IsBoolean()
  isActive?: boolean;
}

export class UserQuery extends BaseQuery {}
