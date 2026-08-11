import { restore } from "@orama/plugin-data-persistence";
import { createFileRoute } from "@tanstack/react-router";

import persistedSearchIndex from "@/search/search-index.gen.json?raw";
import { findHits, type SearchIndex } from "@/search/search-index";

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

export const Route = createFileRoute("/api/search")({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const query = new URL(request.url).searchParams.get("q") ?? "";
        const hits = await findHits(await getSearchIndex(), query);

        return Response.json(hits, {
          // Results for a given query change only on deploy.
          headers: { "Cache-Control": "public, max-age=300" },
        });
      },
    },
  },
});
