import * as cookieParser from "cookie-parser";
import { ApiStatusCode } from "@bill/database";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { ApiException } from "@/exception/api.exception";
import { HttpExceptionFilter } from "@/filter/http.exception.filter";
import { ResponseInterceptor } from "@/interceptor/res.interceptor";
import { AppModule } from "@/modules/app/app.module";
import { Log4jsService } from "@/modules/log4js";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {  });
  const configService = app.get(ConfigService);
  const port = (configService.get("base") || {}).port || 3000;
  const logger = app.get(Log4jsService);

  app.useLogger(logger);
  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.useGlobalInterceptors(new ResponseInterceptor());
  app.useGlobalFilters(new HttpExceptionFilter(logger));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(validationErrors = []) {
        throw new ApiException(
          Object.values(validationErrors[0].constraints || [])[0],
          ApiStatusCode.PARAMETER_VALIDATE_ERROR,
          HttpStatus.OK,
          {
            success: 0,
            message: Object.values(validationErrors[0].constraints || []),
          }
        );
      },
    })
  );

  if (configService.get("base").env !== "production") {
    app.enableCors({
      origin: true,
      methods: "GET,HEAD,PUT,PATCH,DELETE,POST,OPTIONS",
      credential: true,
    });
  }


  await app.listen(port).then(() => {
    console.log("serer start on port: ", port);
  });

  if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(() => app.close());
  }
}

bootstrap();
