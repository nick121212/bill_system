import {
  Controller,
  Request,
  Response,
  Post,
  UseGuards,
  Get,
  Body,
} from "@nestjs/common";

import { Public } from "@/decorator/public";

import { AuthGuard } from "./auth.guard";
import { AuthRequest } from "./auth.interface";
import { AuthService } from "./auth.service";

@Controller({
  path: ["auth"],
})
export class AuthController {
  constructor(private authService: AuthService) {}

  @Public()
  // @UseGuards(AuthGuard)
  @Post("login")
  async login(@Body() body: AuthRequest) {
    return this.authService.login(body);
  }

  @UseGuards(AuthGuard)
  @Post("logout")
  async logout(@Response() res) {
    return res.logout();
  }

  @UseGuards(AuthGuard)
  @Get("profile")
  getProfile(@Request() req) {
    return req.user;
  }
}
