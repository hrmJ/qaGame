import pgMigrate from "node-pg-migrate";
import { beforeAll } from "vitest";

beforeAll(async () => {
  //await pgMigrate({
  //  direction: "up",
  //  migrationsTable: "pgmigrations",
  //  dir: "migrations",
  //  databaseUrl: process.env.DATABASE_URL ?? "",
  //}).catch(() => null);
});
