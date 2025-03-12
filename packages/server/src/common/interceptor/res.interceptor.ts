import { map, Observable } from "rxjs";
import { ApiStatusCode } from "@bill/database";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<unknown>
  ): Observable<unknown> | Promise<Observable<unknown>> {
    // const ctx = context.switchToHttp();

    return next.handle().pipe(
      map((data, ...args) => {
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
