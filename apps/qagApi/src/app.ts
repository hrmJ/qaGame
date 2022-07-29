import Fastify, { FastifyServerOptions } from "fastify";
import cors from "@fastify/cors";
import { sql } from "./db";

interface Card {
  text: string;
}

export function build(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts);
  app.register(cors, {});

  app.get("/", async () => {
    return { hello: "sworld" };
  });

  app.post("/cards", async (req, res) => {
    const { text } = req.body as Card;
    console.log({ text });
    try {
      const [{ id }] =
        await sql`INSERT INTO cards (text) values (${text}) returning *`;
      res.send({ id });
    } catch (e) {
      console.log({ e });
    }
    res.status(422).send({ error: "query failed" });
  });

  return app;
}
