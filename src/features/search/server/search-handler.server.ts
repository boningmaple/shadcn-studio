import { restore } from "@orama/plugin-data-persistence";

import {
  searchContract,
  searchQueryInputFromSearchParams,
  type SearchBadRequestResponse,
} from "@/features/search/api/search.contract";
import persistedSearchIndex from "@/features/search/data/search-index.gen.json?raw";
import { findHits, type SearchIndex } from "@/features/search/lib/search-index";

/**
 * Restored once and reused. The Nitro preset is `node-server`, a long-lived
 * process, so this happens once per boot rather than once per request. A
 * serverless preset would restore it per cold start — the point at which
 * ADR-0001 should be re-examined.
 *
 * Imported as `?raw` so the exact persisted string reaches `restore`, rather
 * than a parsed-then-restringified copy of it.
 */
let restored: Promise<SearchIndex> | undefined;

function getSearchIndex(): Promise<SearchIndex> {
  restored ??= restore<SearchIndex>("json", persistedSearchIndex);

  return restored;
}

export async function handleSearchRequest(request: Request): Promise<Response> {
  const url = new URL(request.url);
  const queryResult = searchContract.query.safeParse(
    searchQueryInputFromSearchParams(url.searchParams),
  );

  if (!queryResult.success) {
    const onlyFailureIsQueryLength = queryResult.error.issues.every(
      (issue) => issue.code === "too_big" && issue.path[0] === "q",
    );
    const body: SearchBadRequestResponse = {
      error: onlyFailureIsQueryLength ? "search_query_too_long" : "invalid_search_query",
    };

    return Response.json(searchContract.responses[400].parse(body), {
      status: 400,
      headers: { "Cache-Control": "no-store" },
    });
  }

  const { q: query } = queryResult.data;
  const hits = await findHits(await getSearchIndex(), query);

  return Response.json(searchContract.responses[200].parse(hits), {
    // Results for a given query change only on deploy.
    headers: { "Cache-Control": "public, max-age=300" },
  });
}
