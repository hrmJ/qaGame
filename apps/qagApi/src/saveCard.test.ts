import { build } from "./app";
import { beforeEach, describe, expect, it } from "vitest";
import { sql } from "./db";

// build()
//

describe("Enpoint for saving cards", () => {
  const app = build();

  beforeEach(async () => {
    await sql`TRUNCATE cards`;
  });

  it("returns 200 if valid request and no errors", async () => {
    const resp = await app.inject({
      method: "POST",
      url: "/cards",
      payload: { contentType: "q", text: "some text" },
    });
    expect(resp.statusCode).toEqual(200);
  });

  it("adds a card if payload is valid", async () => {
    const text = "some text";
    await app.inject({
      method: "POST",
      url: "/cards",
      payload: { contentType: "q", text },
    });
    const inDb = await sql`select text from cards`;
    expect(inDb).toHaveLength(1);
  });

  it.skip("returns 422 if text is empty", async () => {
    const resp = await app.inject({
      method: "POST",
      url: "/cards",
      payload: { contentType: "q", text: "" },
    });
    expect(resp.statusCode).toBeGreaterThan(399);
  });
});
