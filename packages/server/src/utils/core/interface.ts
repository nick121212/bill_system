import { ModuleMetadata } from "@nestjs/common";

export interface ModuleAsyncOptions<ModuleOptions>
  extends Pick<ModuleMetadata, "imports"> {
  useFactory?: (
    ...args: any[]
  ) => ModuleOptions | Promise<ModuleOptions>;
  inject: any[];
}
