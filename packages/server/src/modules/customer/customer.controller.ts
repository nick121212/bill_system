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
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { Roles } from '@/common/decorators/roles.decorator';

import {
  CustomerPriceRequest,
  CustomerQuery,
  CustomerRequest,
} from './customer.interface';
import { CustomerService } from './customer.service';

@Controller({
  path: ['customers'],
})
@Roles(Role.User)
export class CustomerController {
  constructor(private customerService: CustomerService) {}

  @Get('/')
  async all(@Query() query: CustomerQuery) {
    return this.customerService.all(query);
  }

  @Get('/:id')
  async one(@Param('id') id: number) {
    return this.customerService.getById(id);
  }

  @Post('/')
  async create(@Body() body: CustomerRequest) {
    return this.customerService.create(body);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: CustomerRequest) {
    return this.customerService.update(id, body);
  }

  @Get('/:id/products')
  async products(@Param('id') id: number) {
    return this.customerService.getPriceById(id);
  }

  @Post('/:id/products')
  async saveProducts(
    @Param('id') id: number,
    @Body() body: CustomerPriceRequest,
  ) {
    return this.customerService.savePrices(id, body);
  }

  @Delete('/:id')
  async remote(@Param('id') id: number) {
    return this.customerService.remove(id);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 1000000 }),
          new FileTypeValidator({
            fileType:
              'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
          }),
        ],
      }),
    )
    file: Express.Multer.File,
  ) {
    return this.customerService.uploadFile(file);
  }
}
