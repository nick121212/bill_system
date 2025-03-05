export class BaseQuery {
  skip?: number;
  take?: number;
  where?: Record<string, any>;

  get skip_c() {
    return this.skip || 0;
  }

  get take_c() {
    return this.take || 10;
  }

  get where_c() {
    return this.where || {};
  }
}
