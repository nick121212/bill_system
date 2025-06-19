import { Role, ChargeEntity } from '@bill/database';
import {
  Controller,
  Get,
  Param,
  Delete,
  Query,
  Post,
  Body,
} from '@nestjs/common';

import { Roles } from '@/common/decorators/roles.decorator';

import { ChargeQuery, ChargeRequest } from './charge.interface';
import { ChargeService } from './charge.service';

@Controller({
  path: ['charges'],
})
@Roles(Role.User)
export class ChargeController {
  constructor(private chargeService: ChargeService) {}

  @Get('/')
  async all(@Query() query: ChargeQuery) {
    return this.chargeService.all(query);
  }

  @Post('/')
  async create(@Body() body: ChargeRequest) {
    return this.chargeService.create(body);
  }

  @Get('/:id')
  async one(@Param('id') id: number): Promise<ChargeEntity | null> {
    return this.chargeService.getById(id);
  }

  @Delete('/:id')
  async remote(@Param('id') id: number): Promise<ChargeEntity> {
    return this.chargeService.remove(id);
  }
}
