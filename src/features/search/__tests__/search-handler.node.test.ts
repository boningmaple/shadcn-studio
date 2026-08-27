import { describe, expect, it } from "vite-plus/test";

import { searchContract, searchQueryMaxLength } from "@/features/search/api/search.contract";
import { handleSearchRequest } from "@/features/search/server/search-handler.server";

const searchRequest = (url: string) => new Request(`http://localhost${url}`);

describe("handleSearchRequest", () => {
  it("answers a query with valid Hits and cache headers", async () => {
    const response = await handleSearchRequest(searchRequest("/api/search?q=card"));
    const hits = searchContract.responses[200].parse(await response.json());

    expect(response.status).toBe(200);
    expect(response.headers.get("Cache-Control")).toBe("public, max-age=300");
    expect(hits.some((hit) => hit.componentName === "Card")).toBe(true);
  });

  it("answers a request without q with no Hits", async () => {
    const response = await handleSearchRequest(searchRequest("/api/search"));

    expect(searchContract.responses[200].parse(await response.json())).toEqual([]);
  });

  it("rejects a query over the contract limit with a user-correctable error", async () => {
    const query = "x".repeat(searchQueryMaxLength + 1);
    const response = await handleSearchRequest(searchRequest(`/api/search?q=${query}`));

    expect(response.status).toBe(400);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(searchContract.responses[400].parse(await response.json())).toEqual({
      error: "search_query_too_long",
    });
  });

  it("rejects query parameters outside the search contract", async () => {
    const response = await handleSearchRequest(searchRequest("/api/search?q=card&page=2"));

    expect(response.status).toBe(400);
    expect(response.headers.get("Cache-Control")).toBe("no-store");
    expect(searchContract.responses[400].parse(await response.json())).toEqual({
      error: "invalid_search_query",
    });
  });

  it("rejects repeated q values", async () => {
    const response = await handleSearchRequest(searchRequest("/api/search?q=card&q=button"));

    expect(response.status).toBe(400);
    expect(searchContract.responses[400].parse(await response.json())).toEqual({
      error: "invalid_search_query",
    });
  });
});
