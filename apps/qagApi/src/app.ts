import Fastify, { FastifyServerOptions } from "fastify";
import { sql } from "./db";

interface Card {
  text: string;
}

export function build(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts);

  app.get("/", async () => {
    return { hello: "sworld" };
  });

  app.post("/cards", async (req, res) => {
    const { text } = req.body as Card;
    try {
      const [{ id }] =
        await sql`INSERT INTO cards (text) values (${text}) returning *`;
      res.send({ id });
    } catch (e) {
      console.log({ e });
    }
    //console.log("MITÄ;;;;;UUUU");
    //console.log({ res });
    //return { id: 1 };
  });

  return app;
}
