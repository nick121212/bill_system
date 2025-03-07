import * as _ from "lodash";

export class BaseEntity<T> {
  extend(partial: Partial<T>) {
    Object.assign(this, _.defaults(partial, this));

    return this;
  }

  constructor(partial?: Partial<T>) {
    // Object.assign(this, partial);
  }
}

