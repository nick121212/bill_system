import { PassThrough } from 'stream';
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
  Res,
  Patch,
} from '@nestjs/common';

import { Roles } from '@/common/decorators/roles.decorator';

import { OrderExportService } from './excel.service';
import {
  OrderExportRequest,
  OrderQuery,
  OrderRequest,
  OrderStatusRequest,
} from './order.interface';
import { OrderService } from './order.service';

@Controller({
  path: ['orders'],
})
@Roles(Role.User)
export class OrderController {
  constructor(
    private orderService: OrderService,
    private orderExportService: OrderExportService,
  ) {}

  @Get('/')
  async all(@Query() query: OrderQuery) {
    return this.orderService.all(query);
  }

  @Get('/:id')
  async one(@Param('id') id: number) {
    return this.orderService.getById(id);
  }

  @Get('/:id/categories')
  async oneWithCategories(@Param('id') id: number) {
    return this.orderService.getByIdWithCategories(id);
  }

  @Post('/')
  async create(@Body() body: OrderRequest) {
    return this.orderService.create(body);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: OrderRequest) {
    return this.orderService.update(id, body);
  }

  @Put('/:id/status')
  async updateStatus(
    @Param('id') id: number,
    @Body() body: OrderStatusRequest,
  ) {
    return this.orderService.changeStatus(id, body);
  }

  @Delete('/:id')
  async remote(@Param('id') id: number) {
    return this.orderService.remove(id);
  }

  @Patch('/export')
  async export(@Body() body: OrderExportRequest, @Res() res: any) {
    const data = await this.orderExportService.export(body);

    const bufferStream = new PassThrough();
    bufferStream.end(data);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return bufferStream.pipe(res);
  }

  @Patch('/uuid/:key')
  async getUUID(@Param('key') key: string) {
    return this.orderService.generateIndex(key);
  }
}
