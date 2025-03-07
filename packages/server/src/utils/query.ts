import { Type } from "class-transformer";

export class BaseQuery {
  @Type(() => Number)
  skip?: number;

  @Type(() => Number)
  take?: number;

  @Type(() => Object)
  where?: Record<string, any>;
}
