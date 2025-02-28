export class BaseEntity<T> {
  extend(partial: Partial<T>) {
    Object.assign(this, partial);

    return this;
  }

  constructor(partial?: Partial<T>) {
    // Object.assign(this, partial);
  }
}
