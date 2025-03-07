import { IsString } from "class-validator";

export class AuthRequest {
  @IsString()
  username: string;
  @IsString()
  password: string;
}
