import { build } from "./app";
import { describe, expect, it } from "vitest";

// build()
//

describe("Enpoint for saving cards", () => {
  const app = build();

  it("returns 200 if valid request and no errors", async () => {
    const resp = await app.inject({
      method: "POST",
      url: "/cards",
      payload: { contentType: "Q", text: "some text" },
    });
    expect(resp.statusCode).toEqual(200);
  });
});
