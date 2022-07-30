import { build } from "./app";
import { beforeEach, describe, expect, it } from "vitest";
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

  it("returns a question from the database", async () => {
    await sql`INSERT INTO cards (text, content_type) values (${text}, ${contentType})`;
    const resp = await app.inject({
      method: "GET",
      url: "/cards/q",
    });
    const json = await resp.json();
    expect(json.text).toEqual(text);
  });

  it.only("returns null if no questions in the database", async () => {
    const resp = await app.inject({
      method: "GET",
      url: "/cards/q",
    });
    const json = await resp.json();
    expect(json).toBeNull();
  });
});
