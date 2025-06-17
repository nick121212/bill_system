import { Role, ChargeEntity } from '@bill/database';
import { Controller, Get, Param, Delete, Query } from '@nestjs/common';

import { Roles } from '@/common/decorators/roles.decorator';

import { ChargeQuery } from './charge.interface';
import { ChargeService } from './charge.service';

@Controller({
  path: ['charges'],
})
@Roles(Role.Admin)
export class ChargeController {
  constructor(private chargeService: ChargeService) {}

  @Get('/')
  async all(@Query() query: ChargeQuery) {
    return this.chargeService.all(query);
  }

  @Get('/:id')
  async one(@Param('id') id: number): Promise<ChargeEntity | null> {
    return this.chargeService.getById(id);
  }

  @Delete('/:id')
  async remote(@Param('id') id: number): Promise<ChargeEntity | null> {
    return this.chargeService.remove(id);
  }
}
