import Fastify, { FastifyServerOptions } from "fastify";
import cors from "@fastify/cors";
import { sql } from "./db";

interface Card {
  text: string;
  contentType: "q" | "a";
}

export function build(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts);
  app.register(cors, {});

  app.get("/cards/q", async (_, res) => {
    const contenType = "q";
    const [card] =
      await sql`SELECT text from cards  WHERE content_type = ${contenType} ORDER BY RANDOM() limit 1`.catch(
        () => {
          return [];
        }
      );
    res.send(card ?? null);
  });

  app.get("/cards/a", async (_, res) => {
    const contenType = "a";
    const [card] =
      await sql`SELECT text from cards  WHERE content_type = ${contenType} ORDER BY RANDOM() limit 1`.catch(
        () => {
          return [];
        }
      );
    res.send(card ?? null);
  });

  app.post("/cards", async (req, res) => {
    const { text, contentType } = req.body as Card;
    try {
      const [{ id }] =
        await sql`INSERT INTO cards (text, content_type) values (${text}, ${contentType}) returning *`;
      res.send({ id });
    } catch (error) {
      console.log({ error });
    }
    res.status(422).send({ error: "query failed" });
  });

  return app;
}
