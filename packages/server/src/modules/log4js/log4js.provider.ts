import { Configuration } from "log4js";
import { Provider } from "@nestjs/common";

import { LOG4JS_OPTION } from "./log4js.constants";

export function createOptionProvider(
  options?: Configuration | string
): Provider {
  return {
    provide: LOG4JS_OPTION,
    useFactory: () => options,
  };
}
