import { readFileSync } from 'fs';
import { join } from 'path';
import { PassThrough } from 'stream';
import { Controller, Get, Res } from '@nestjs/common';

import { Public } from '@/common/decorators/public.decorator';

@Controller({
  path: [''],
})
@Public()
export class AppController {
  constructor() {}

  @Get('/product.xlsx')
  getFile(@Res() res: any) {
    const file = readFileSync(join(process.cwd(), 'template.xlsx'));
    const bufferStream = new PassThrough();
    bufferStream.end(file);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return bufferStream.pipe(res);
  }

  @Get('/customer.xlsx')
  getCustomerFile(@Res() res: any) {
    const file = readFileSync(join(process.cwd(), 'customer.xlsx'));
    const bufferStream = new PassThrough();
    bufferStream.end(file);

    // eslint-disable-next-line @typescript-eslint/no-unsafe-return
    return bufferStream.pipe(res);
  }
}
