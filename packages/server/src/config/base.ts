import { registerAs } from "@nestjs/config";

export default registerAs("base", () => ({
  port: parseInt(process.env.APP_PORT || "3000"),
  jwtSecret: process.env.JWT_SECRET
}));
