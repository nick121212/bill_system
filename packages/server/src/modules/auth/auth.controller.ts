import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  Get,
} from '@nestjs/common';

import { ActiveUser } from '@/common/decorators/active-user.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { ActiveUserData } from '@/common/interfaces/active-user-data.interface';

import { AuthRequest } from './auth.interface';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Public()
  @Post('sign-in')
  signIn(@Body() signInDto: AuthRequest) {
    return this.authService.login(signInDto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('profile')
  profile(@ActiveUser() user: ActiveUserData): Promise<unknown> {
    return this.authService.profile(user);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-out')
  signOut(@ActiveUser('id') userId: string): Promise<void> {
    return this.authService.signOut(userId);
  }
}
