import * as cookieParser from "cookie-parser";
import { EntityManager } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { HttpStatus, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";

import { ApiException } from "@/common/exception/api.exception";
import { HttpExceptionFilter } from "@/common/filter/http.exception.filter";
import { ResponseInterceptor } from "@/common/interceptor/res.interceptor";
import { AppModule } from "@/modules/app/app.module";
import { Log4jsService } from "@/modules/log4js";

import migrationExecutor from "./migrate";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});
  const configService = app.get(ConfigService);
  const port = (configService.get("app") || {}).port || 3000;
  const logger = app.get(Log4jsService);
  const em = app.get(EntityManager);

  app.useLogger(logger);
  app.use(cookieParser());
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  app.useGlobalInterceptors(new ResponseInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      exceptionFactory(validationErrors = []) {
        throw new ApiException(
          Object.values(validationErrors[0].constraints || [])[0],
          ApiStatusCode.PARAMETER_VALIDATE_ERROR,
          HttpStatus.OK
        );
      },
    })
  );

  if (configService.get("app").nodeEnv !== "production") {
    app.enableCors({
      origin: true,
      methods: "GET,HEAD,PUT,PATCH,DELETE,POST,OPTIONS",
      credential: true,
    });
  }

  await app.listen(port).then(() => {
    console.log("serer start on port: ", port);

    migrationExecutor(em);
  });

  if ((module as any).hot) {
    (module as any).hot.accept();
    (module as any).hot.dispose(() => app.close());
  }
}

bootstrap();
