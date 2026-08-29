import { HttpResponse, http } from "msw";
import { describe, expect, vi } from "vite-plus/test";

import { SearchFetchError, fetchSearchHits } from "@/features/search/api/search-client";
import { searchContract, searchRequestUrl } from "@/features/search/api/search.contract";

import { it, mockedSearchHitsByQuery } from "./test-extend";

async function expectSearchFetchError(promise: Promise<unknown>): Promise<SearchFetchError> {
  try {
    await promise;
  } catch (error) {
    expect(error).toBeInstanceOf(SearchFetchError);

    return error as SearchFetchError;
  }

  throw new Error("Expected a SearchFetchError.");
}

describe("searchRequestUrl", () => {
  it("encodes the query for the Server Route", () => {
    expect(searchRequestUrl("button & card")).toBe(`${searchContract.path}?q=button+%26+card`);
  });
});

describe("fetchSearchHits", () => {
  it("returns the parsed Hits with the query that asked for them", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");
    const controller = new AbortController();

    await expect(fetchSearchHits("card", controller.signal)).resolves.toEqual({
      hits: mockedSearchHitsByQuery.card,
      query: "card",
    });
    expect(fetch).toHaveBeenCalledWith("/api/search?q=card", {
      method: "GET",
      signal: controller.signal,
    });
  });

  it("exposes a contracted bad-request response", async ({ worker }) => {
    worker.use(
      http.get(searchContract.path, () =>
        HttpResponse.json({ error: "search_query_too_long" }, { status: 400 }),
      ),
    );

    const error = await expectSearchFetchError(
      fetchSearchHits("card", new AbortController().signal),
    );

    expect(error.kind).toBe("bad-request");
    expect(error.status).toBe(400);
    expect(error.code).toBe("search_query_too_long");
  });

  it("rejects an overlength query before making a request", async () => {
    const fetch = vi.spyOn(globalThis, "fetch");

    const error = await expectSearchFetchError(
      fetchSearchHits("x".repeat(201), new AbortController().signal),
    );

    expect(error.kind).toBe("bad-request");
    expect(error.code).toBe("search_query_too_long");
    expect(fetch).not.toHaveBeenCalled();
  });

  it("turns HTTP failures into SearchFetchError with status", async ({ worker }) => {
    worker.use(http.get(searchContract.path, () => HttpResponse.json([], { status: 500 })));

    const error = await expectSearchFetchError(
      fetchSearchHits("card", new AbortController().signal),
    );

    expect(error.message).toBe("Search failed with undocumented status 500");
    expect(error.kind).toBe("unexpected-status");
    expect(error.status).toBe(500);
  });

  it("turns network failures into SearchFetchError", async ({ worker }) => {
    worker.use(http.get(searchContract.path, () => Response.error()));

    const error = await expectSearchFetchError(
      fetchSearchHits("card", new AbortController().signal),
    );

    expect(error.message).toBe("Search request failed");
    expect(error.kind).toBe("network");
    expect(error.cause).toBeInstanceOf(TypeError);
  });

  it("turns invalid JSON into SearchFetchError", async ({ worker }) => {
    worker.use(http.get(searchContract.path, () => new Response("not json")));

    const error = await expectSearchFetchError(
      fetchSearchHits("card", new AbortController().signal),
    );

    expect(error.message).toBe("Search response was not valid JSON");
    expect(error.kind).toBe("invalid-response");
    expect(error.cause).toBeInstanceOf(SyntaxError);
  });

  it("turns an invalid Hit shape into SearchFetchError", async ({ worker }) => {
    worker.use(http.get(searchContract.path, () => HttpResponse.json([{ title: "Card" }])));

    const error = await expectSearchFetchError(
      fetchSearchHits("card", new AbortController().signal),
    );

    expect(error.message).toBe("Search response had an invalid shape");
    expect(error.kind).toBe("invalid-response");
  });

  it("rejects a malformed contracted bad-request response", async ({ worker }) => {
    worker.use(
      http.get(searchContract.path, () => HttpResponse.json({ error: "unknown" }, { status: 400 })),
    );

    const error = await expectSearchFetchError(
      fetchSearchHits("card", new AbortController().signal),
    );

    expect(error.kind).toBe("invalid-response");
    expect(error.status).toBe(400);
  });

  it("rejects an undocumented success status", async ({ worker }) => {
    worker.use(http.get(searchContract.path, () => new Response(null, { status: 204 })));

    const error = await expectSearchFetchError(
      fetchSearchHits("card", new AbortController().signal),
    );

    expect(error.kind).toBe("unexpected-status");
    expect(error.status).toBe(204);
  });

  it("does not wrap abort errors", async ({ worker }) => {
    const controller = new AbortController();
    worker.use(
      http.get(
        searchContract.path,
        ({ request }) =>
          new Promise<Response>((resolve) => {
            request.signal.addEventListener(
              "abort",
              () => {
                resolve(HttpResponse.json(mockedSearchHitsByQuery.card));
              },
              { once: true },
            );
          }),
      ),
    );

    const promise = fetchSearchHits("card", controller.signal);
    controller.abort();

    await expect(promise).rejects.toMatchObject({ name: "AbortError" });
  });
});
