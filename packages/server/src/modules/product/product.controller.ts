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
  MaxFileSizeValidator,
  FileTypeValidator,
  ParseFilePipe,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';

import { ActiveUser } from '@/common/decorators/active-user.decorator';
import { Roles } from '@/common/decorators/roles.decorator';
import { ActiveUserData } from '@/common/interfaces/active-user-data.interface';
import { Log4jsService } from '@/modules/log4js';

import { ProductBodyRequest, ProductQuery } from './product.interface';
import { ProductService } from './product.service';

@Controller({
  path: ['products'],
})
@Roles(Role.User)
export class ProductController {
  constructor(
    private productService: ProductService,
    private readonly log4jService: Log4jsService,
  ) {}

  @Get('/')
  async all(@Query() query: ProductQuery) {
    return this.productService.all(query);
  }

  @Get('/:id')
  async one(@Param('id') id: number) {
    return this.productService.getById(id);
  }

  @Post('/')
  async create(
    @Body() body: ProductBodyRequest,
    @ActiveUser() user: ActiveUserData,
  ) {
    return this.productService.create(body, user);
  }

  @Put('/:id')
  async update(@Param('id') id: number, @Body() body: ProductBodyRequest) {
    return this.productService.update(id, body);
  }

  @Delete('/:id')
  async remote(@Param('id') id: number) {
    return this.productService.remove(id);
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
    return this.productService.uploadFile(file);
  }
}
