import { ApiStatusCode } from "@bill/database";
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { ApiException } from "./api.exception";

export class HttpExceptionFilter implements ExceptionFilter {
  // constructor(private logger: log4jslogger)

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const req = ctx.getRequest();

    if (exception instanceof ApiException) {
      const status = exception.getStatus();

      return response.status(status).json({
        code: exception.getErrorCode(),
        message: exception.getErrorMsg(),
        data: exception.getErrorData() || {
          timestamp: Date.now(),
          path: req.url,
        },
      });
    }

    response.status(HttpStatus.OK).json({
      code: ApiStatusCode.UNKOWN_ERROR,
      data: {
        timestamp: Date.now(),
        path: req.url,
      },
      message: "UNKNOWN_ERROR",
    });
  }
}
