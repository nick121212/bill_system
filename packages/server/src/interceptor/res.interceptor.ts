import { catchError, map, Observable, throwError } from "rxjs";
import { ApiStatusCode } from "@bill/database";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    // const ctx = context.switchToHttp();

    return next.handle().pipe(
      map((data, ...args) => {
        console.log(data, args);
        return {
          data,
          code: ApiStatusCode.SUCCESS,
          message: "SUCCESS",
        };
      })
    );
    // .pipe(catchError((err) => ));
  }
}
