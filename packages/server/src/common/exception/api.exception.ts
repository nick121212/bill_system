import { ApiStatusCode } from "@bill/database";
import { HttpException, HttpStatus } from "@nestjs/common";

export class ApiException extends HttpException {
  private errorMsg: string;
  private errorCode: ApiStatusCode;
  private errorData: Record<string, unknown>;

  constructor(
    errorMsg: string,
    errorCode: ApiStatusCode,
    statusCode: HttpStatus,
    errorData?: Record<string, unknown>
  ) {
    super(errorMsg, statusCode);

    this.errorCode = errorCode;
    this.errorData = errorData || {};
    this.errorMsg = errorMsg;
  }

  getErrorMsg() {
    return this.errorMsg;
  }

  getErrorCode() {
    return this.errorCode;
  }

  getErrorData() {
    return this.errorData;
  }
}
