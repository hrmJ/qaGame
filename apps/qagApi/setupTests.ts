import pgMigrate from "node-pg-migrate";
import { beforeAll } from "vitest";

beforeAll(async () => {
  await pgMigrate({
    direction: "down",
    migrationsTable: "pgmigrations",
    dir: "migrations",
    databaseUrl: process.env.DATABASE_URL ?? "",
  });
  await pgMigrate({
    direction: "up",
    migrationsTable: "pgmigrations",
    dir: "migrations",
    databaseUrl: process.env.DATABASE_URL ?? "",
  });
});
