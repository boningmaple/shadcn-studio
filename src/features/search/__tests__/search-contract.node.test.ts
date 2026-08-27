import { describe, expect, it } from "vite-plus/test";

import {
  searchContract,
  searchQueryInputFromSearchParams,
  searchQueryMaxLength,
  searchRequestUrl,
} from "@/features/search/api/search.contract";

describe("searchContract", () => {
  it("normalizes and encodes a query using the Server Route interface", () => {
    expect(searchContract.query.parse({ q: "  button & card  " })).toEqual({
      q: "button & card",
    });
    expect(searchRequestUrl("  button & card  ")).toBe("/api/search?q=button+%26+card");
  });

  it("defaults a missing query to the idle search", () => {
    expect(searchContract.query.parse({})).toEqual({ q: "" });
  });

  it("rejects queries over 200 normalized characters", () => {
    expect(
      searchContract.query.safeParse({ q: `  ${"x".repeat(searchQueryMaxLength)}  ` }).success,
    ).toBe(true);
    expect(
      searchContract.query.safeParse({ q: "x".repeat(searchQueryMaxLength + 1) }).success,
    ).toBe(false);
  });

  it("rejects unknown and repeated query parameters", () => {
    const unknown = new URLSearchParams({ page: "2", q: "card" });
    const repeated = new URLSearchParams("q=card&q=button");

    expect(searchContract.query.safeParse(searchQueryInputFromSearchParams(unknown)).success).toBe(
      false,
    );
    expect(searchContract.query.safeParse(searchQueryInputFromSearchParams(repeated)).success).toBe(
      false,
    );
  });

  it("defines the successful Hit and expected bad-request bodies", () => {
    expect(
      searchContract.responses[200].parse([
        {
          componentName: "Card",
          href: "/material-design/components/card",
          kind: "component",
          score: 1,
        },
      ]),
    ).toHaveLength(1);
    expect(searchContract.responses[400].parse({ error: "search_query_too_long" })).toEqual({
      error: "search_query_too_long",
    });
    expect(searchContract.responses[400].parse({ error: "invalid_search_query" })).toEqual({
      error: "invalid_search_query",
    });
  });
});
