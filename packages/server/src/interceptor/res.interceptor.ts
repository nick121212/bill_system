import { map, Observable } from "rxjs";
import { ApiStatusCode } from "@bill/database";
import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";

export class ResponseInterceptor implements NestInterceptor {
  intercept(
    context: ExecutionContext,
    next: CallHandler<any>
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();

    next.handle().subscribe((x) => console.log(x));

    return next.handle().pipe(
      map((data) => ({
        data,
        code: ApiStatusCode.SUCCESS,
        message: "SUCCESS",
      }))
    );
  }
}
