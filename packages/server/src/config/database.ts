import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  type: "mysql",
  host: process.env.TYPEORM_HOST,
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: process.env.TYPEORM_DATABASE,
  port: parseInt(process.env.TYPEORM_PORT || "3306"),
  logging: process.env.TYPEORM_LOGGING === "true",
  migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === "true",
  synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
}));
