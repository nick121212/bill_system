import { Role } from '@bill/database';
import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Patch,
} from '@nestjs/common';

import { ActiveUser } from '@/common/decorators/active-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { ActiveUserData } from '@/common/interfaces/active-user-data.interface';
import { Log4jsService } from '@/modules/log4js';

import { UserPasswordRequest, UserQuery, UserRequest } from './user.interface';
import { UserService } from './user.service';

@Controller({
  path: ['users'],
})
@Roles(Role.Admin)
export class UserController {
  constructor(
    private userService: UserService,
    private readonly log4jService: Log4jsService,
  ) {}

  @Get('/')
  async all(@Query() query: UserQuery) {
    return this.userService.all(query);
  }

  @Get('/:id')
  async one(@Param('id') id: number) {
    return this.userService.getById(id);
  }

  @Post('/')
  async create(@Body() body: UserRequest) {
    return this.userService.create(body);
  }

  @Patch('/:id/password')
  async changePassword(
    @Body() body: UserPasswordRequest,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.userService.changePassword(body, user);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: UserRequest) {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  async remote(@Param('id') id: number) {
    return this.userService.remove(id);
  }
}
