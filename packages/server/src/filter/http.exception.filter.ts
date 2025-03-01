import { ApiStatusCode } from "@bill/database";
import {
  ArgumentsHost,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from "@nestjs/common";

import { Log4jsService } from "@/modules/log4js";

import { ApiException } from "../exception/api.exception";

export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: Log4jsService) {}

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const req = ctx.getRequest();

    this.logger.getLogger("HttpExceptionFilter").error(exception.message);

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
      message: exception.message || "UNKNOWN_ERROR",
    });
  }
}
