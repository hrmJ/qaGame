import Fastify, { FastifyServerOptions } from "fastify";
import cors from "@fastify/cors";
import { sql } from "./db";
import { bodySchema, loadQuestionSchema } from "./schemas";
import { JsonSchemaToTsProvider } from "@fastify/type-provider-json-schema-to-ts";
import { handleDbError } from "../utils";

interface Card {
  text: string;
  contentType: "q" | "a";
}

export function build(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts).withTypeProvider<JsonSchemaToTsProvider>();
  app.register(cors, {});

  app.get(
    "/cards/q",
    {
      schema: {
        querystring: {
          type: "object",
          properties: {
            used: { type: "array", items: { type: "string" } },
            required: false,
          },
        },
      } as const,
    },
    async (request, res) => {
      const contenType = "q";
      const { used = ["-1"] } = request.query;
      const filteredUsed = used.filter((id) => id !== undefined);
      const [card] =
        (await sql`SELECT text from cards  
        WHERE content_type = ${contenType}
        AND id NOT IN ${sql(filteredUsed)} 
        ORDER BY RANDOM() limit 1`.catch(handleDbError)) ?? [];
      res.send(card ?? null);
    }
  );

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
