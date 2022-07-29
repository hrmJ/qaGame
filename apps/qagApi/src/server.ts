import Fastify from "fastify";
import { build } from "./app";
import { sql } from "./db";

const server = build({ logger: true });

async function start() {
  try {
    const tst = await sql`select * from cards`;
    await server.listen({ port: 3000 });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
start();
