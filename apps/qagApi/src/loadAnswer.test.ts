//
import { build } from "./app";
import { beforeEach, describe, expect, it } from "vitest";
import { sql } from "./db";

describe("Enpoint for loading an answer", () => {
  const app = build();
  const text = "some answer";
  const contentType = "a";

  beforeEach(async () => {
    await sql`TRUNCATE cards`;
  });

  it(
    "returns a answer from the database",
    async () => {
      await sql`INSERT INTO cards (text, content_type) values (${text}, ${contentType})`;
      const resp = await app.inject({
        method: "GET",
        url: "/cards/a",
      });
      const json = await resp.json();
      expect(json.text).toEqual(text);
    },
    { retry: 20 }
  );

  it("returns null in no questions in the database", async () => {
    const resp = await app.inject({
      method: "GET",
      url: "/cards/a",
    });
    const json = await resp.json();
    expect(json).toBeNull();
  });
});
