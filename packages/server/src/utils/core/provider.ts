import { Provider } from "@nestjs/common";

import { ModuleAsyncOptions } from "./interface";

export const createClient = <O, F>(
  factory: (opts: O) => F,
  INSTANCE_OPTIONS: symbol,
  INSTANCE: symbol
): Provider => ({
  provide: INSTANCE,
  useFactory: (opts: O) => {
    return factory(opts);
  },
  inject: [INSTANCE_OPTIONS],
});

export const createAnyncClientOptions = (
  options: ModuleAsyncOptions<any>,
  INSTNCE_OPTIONS: symbol
): Provider => ({
  provide: INSTNCE_OPTIONS,
  useFactory: options.useFactory as any,
  inject: options.inject,
});
