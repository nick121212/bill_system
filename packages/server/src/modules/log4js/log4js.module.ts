import { Configuration } from "log4js";
import { Global, Module, DynamicModule } from "@nestjs/common";

import { createOptionProvider } from "./log4js.provider";
import { Log4jsService } from "./log4js.service";

@Module({
  providers: [Log4jsService, createOptionProvider()],
  exports: [Log4jsService],
})
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class Log4jsModule {
  static forRoot(options?: Configuration | string): DynamicModule {
    const optionProvider = createOptionProvider(options);
    return {
      module: Log4jsModule,
      providers: [Log4jsService, optionProvider],
      exports: [Log4jsService],
    };
  }
}

@Global()
@Module({
  providers: [Log4jsService, createOptionProvider()],
  exports: [Log4jsService],
})
// biome-ignore lint/complexity/noStaticOnlyClass: <explanation>
export class Log4jsGlobalModule {
  static forRoot(options?: Configuration | string): DynamicModule {
    const optionProvider = createOptionProvider(options);
    return {
      module: Log4jsGlobalModule,
      providers: [Log4jsService, optionProvider],
      exports: [Log4jsService],
    };
  }
}
