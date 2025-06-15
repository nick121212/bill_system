import { Role } from '@bill/database';
import {
  Controller,
  Request,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  Query,
  Req,
  Res,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ActiveUser } from '@/common/decorators/active-user.decorator';
import { Public } from '@/common/decorators/public.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { ActiveUserData } from '@/common/interfaces/active-user-data.interface';

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
  async all(@Query() query: CustomerQuery, @ActiveUser() user: ActiveUserData) {
    return this.customerService.all(query, user);
  }

  @Get('/:id')
  async one(@Param('id') id: number) {
    return this.customerService.getById(id);
  }

  @Post('/')
  async create(
    @Body() body: CustomerRequest,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.customerService.create(body, user);
  }

  @Put('/:id')
  async update(
    @Param('id') id: number,
    @Body() body: CustomerRequest,
    @ActiveUser() user: ActiveUserData,
  ) {
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
