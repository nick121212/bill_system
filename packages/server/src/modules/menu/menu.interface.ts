import { IsNumber, IsString, isString, Max, Min } from "class-validator";
import { PermissionType } from "@bill/database";

export class MenuBodyRequest {
  id?: number;

  @IsString()
  label: string;
  @IsString()
  name: string;
  @IsString()
  icon: string;
  @IsNumber()
  type: PermissionType;
  @IsString()
  route: string;
  @IsNumber()
  @Max(100)
  @Min(0)
  order: number;
  parentId?: number;
}
