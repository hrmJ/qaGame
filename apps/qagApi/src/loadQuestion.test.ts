import { build } from "./app";
import { beforeEach, describe, expect, it, vitest } from "vitest";
import { sql } from "./db";

// build()
//

describe("Enpoint for loading a question", () => {
  const app = build();
  const text = "some question";
  const contentType = "q";

  beforeEach(async () => {
    await sql`TRUNCATE cards`;
  });

  it(
    "returns a question from the database",
    async () => {
      await sql`INSERT INTO cards (text, content_type) values (${text}, ${contentType})`;
      const resp = await app.inject({
        method: "GET",
        url: "/cards/q",
      });
      const json = await resp.json();
      expect(json.text).toEqual(text);
    },
    { retry: 20 }
  );

  it(
    "returns null if no questions in the database",
    async () => {
      const resp = await app.inject({
        method: "GET",
        url: "/cards/q",
      });
      const json = await resp.json();
      expect(json).toBeNull();
    },
    { retry: 20 }
  );

  it(
    "Does not return a question if id listed as used",
    async () => {
      const texts = ["first text", "second text", "third text"];
      await Promise.all(
        texts.map(
          (thisText) =>
            sql`INSERT INTO cards (text, content_type) values (${thisText}, ${contentType})`
        )
      );
      const idRes = await sql`SELECT id FROM cards`;
      const existingIds = idRes.map((row) => row.id);

      const resps = await Promise.all(
        [...Array(20)].map(() =>
          app.inject({
            method: "GET",
            url: `/cards/q?used=${existingIds[0]}&used=${existingIds[1]}`,
          })
        )
      );
      const jsons = await Promise.all(resps.map((resp) => resp.json()));
      const outputs = jsons.map((json) => json.text);
      expect(outputs).not.toContain(undefined);
      expect(outputs).not.toContain(texts[0]);
      expect(outputs).not.toContain(texts[1]);
    },
    { retry: 20 }
  );

  it("Returns an indicator when no questions found because of all have been used", () => {
    // so that the frontend can make a reset
  });
});
