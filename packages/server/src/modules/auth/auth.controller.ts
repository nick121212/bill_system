import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Request,
  Get,
} from "@nestjs/common";

import { ActiveUser } from "@/common/decorators/active-user.decorator";
import { Public } from "@/common/decorators/public.decorator";

import { AuthRequest } from "./auth.interface";
import { AuthService } from "./auth.service";

type RequestWithUser = Request & {
  user: unknown;
};

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post("sign-in")
  signIn(@Body() signInDto: AuthRequest) {
    return this.authService.login(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get("profile")
  profile(
    @ActiveUser("id") userId: string,
    @Request() req: Request
  ): Promise<unknown> {
    return Promise.resolve((req as RequestWithUser).user);
  }

  @HttpCode(HttpStatus.OK)
  @Post("sign-out")
  signOut(@ActiveUser("id") userId: string): Promise<void> {
    return this.authService.signOut(userId);
  }
}
