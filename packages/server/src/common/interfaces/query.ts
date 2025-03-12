import { Type } from "class-transformer";

export class BaseQuery<T = Record<string, unknown>> {
  @Type(() => Number)
  skip?: number;

  @Type(() => Number)
  take?: number;

  @Type(() => Object)
  where?: T;
}
