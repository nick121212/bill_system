import { registerAs } from "@nestjs/config";

export default registerAs("app", () => {
  return {
    nodeEnv: process.env.NODE_ENV || "development",
    port: parseInt(process.env.APP_PORT || "3000"),
  };
});
