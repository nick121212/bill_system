import { Role } from '@bill/database';
import { Controller, Delete } from '@nestjs/common';

import { Roles } from '@/common/decorators/roles.decorator';

import { ResetService } from './reset.service';

@Controller({
  path: ['reset'],
})
@Roles(Role.User)
export class ResetController {
  constructor(private resetService: ResetService) {}

  @Delete('products')
  async resetProducts() {
    return this.resetService.resetProducts();
  }
}
