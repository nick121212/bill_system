import { createReadStream, readFileSync } from "fs";
import { join } from "path";
import { PassThrough } from "stream";
import { Controller, Get, Res, StreamableFile } from "@nestjs/common";

import { Public } from "@/common/decorators/public.decorator";

@Controller({
  path: [""],
})
@Public()
export class AppController {
  constructor() {}

  @Get("/product.xlsx")
  getFile(@Res() res: any) {
    const file = readFileSync(join(process.cwd(), "产品分类.xlsx"));
    // 创建一个bufferstream
    const bufferStream = new PassThrough();
    //将Buffer写入
    bufferStream.end(file);

    // return bufferStream.pipe(res);
    return bufferStream.pipe(res);
  }
}
