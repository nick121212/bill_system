import { registerAs } from "@nestjs/config";

export default registerAs("database", () => ({
  type: "mysql",
  host: process.env.DB_HOST,
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: Number.parseInt(process.env.DB_PORT || "3306"),
  logging:true
  // migrationsRun: process.env.TYPEORM_MIGRATIONS_RUN === "true",
  // synchronize: process.env.TYPEORM_SYNCHRONIZE === "true",
}));
