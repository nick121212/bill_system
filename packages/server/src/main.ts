import * as cookieParser from "cookie-parser";
import { EntityManager } from "typeorm";
import { ApiStatusCode } from "@bill/database";
import { HttpStatus, Module, ValidationPipe } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { NestExpressApplication } from "@nestjs/platform-express";

import { ApiException } from "@/common/exception/api.exception";
import { HttpExceptionFilter } from "@/common/filter/http.exception.filter";
import { ResponseInterceptor } from "@/common/interceptor/res.interceptor";
import { AppModule } from "@/modules/app/app.module";
import { Log4jsService } from "@/modules/log4js";

import migrationExecutor from "./migrate";

type ModuleWithHotReload = NodeJS.Module & {
  hot: {
    accept: VoidFunction;
    dispose: (func: VoidFunction) => void;
  };
};

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {});
  const configService = app.get(ConfigService);
  const port = configService.get("app")?.port || 3000;
  const logger = app.get(Log4jsService);
  const em = app.get(EntityManager);

  app.useLogger(logger);
  app.use(cookieParser());
  // 全局异常过滤器，统一处理HTTP异常
  app.useGlobalFilters(new HttpExceptionFilter(logger));
  // 全局响应拦截器，统一处理响应格式
  app.useGlobalInterceptors(new ResponseInterceptor());

  // 全局验证管道，用于请求参数验证
  app.useGlobalPipes(
    new ValidationPipe({
      // 自动转换请求参数类型
      transform: true,
      // 自定义验证异常处理
      exceptionFactory(validationErrors = []) {
        throw new ApiException(
          Object.values(validationErrors[0].constraints || [])[0],
          ApiStatusCode.PARAMETER_VALIDATE_ERROR,
          HttpStatus.OK
        );
      },
    })
  );
  // 设置查询参数解析器为扩展模式
  app.set("query parser", "extended");

  // 非生产环境启用CORS
  if (configService.get("app").nodeEnv !== "production") {
    app.enableCors({
      origin: true, // 允许所有来源
      methods: "GET,HEAD,PUT,PATCH,DELETE,POST,OPTIONS", // 允许的HTTP方法
      // credential: true, // 是否允许发送认证信息
    });
  }

  // 启动服务并执行数据库迁移
  await app.listen(port).then(() => {
    console.log("serer start on port: ", port);

    // 执行数据库迁移
    migrationExecutor(em, configService.get("app")?.secret);
  });

  // 热模块替换支持
  const hot = (module as ModuleWithHotReload).hot;

  if (hot) {
    hot.accept();
    hot.dispose(() => app.close());
  }
}

bootstrap();
