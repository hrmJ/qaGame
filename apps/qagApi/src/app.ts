import Fastify, { FastifyServerOptions } from "fastify";

export function build(opts: FastifyServerOptions = {}) {
  const app = Fastify(opts);

  app.get("/", async () => {
    return { hello: "sworld" };
  });

  app.post("/cards", async () => {
    return { id: 1 };
  });

  return app;
}
