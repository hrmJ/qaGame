import Fastify from "fastify";
import { build } from "./app";
import { sql } from "./db";

const server = build({ logger: true });
console.log(process.env.HOST);

async function start() {
  try {
    const tst = await sql`select * from cards`;
    await server.listen({ port: 3000, host: "192.168.0.9" });
  } catch (err) {
    server.log.error(err);
    process.exit(1);
  }
}
start();
