import { LRUCache } from "lru-cache";

const options = {
  max: 500,

  // for use with tracking overall storage size
  maxSize: 5000,

  // how long to live in ms
  ttl: 1000 * 3,

  // return stale items before removing from cache?
  allowStale: false,

  updateAgeOnGet: false,
  updateAgeOnHas: false,

  sizeCalculation: (_value: any, _key: any) => {
    return 1;
  },
};

const cache = new LRUCache<any,any,unknown>(options);

export default cache;
