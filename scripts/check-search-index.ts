import { readFile } from "node:fs/promises";

import { buildSearchIndex, searchIndexArtifactPath } from "./build-search-index.ts";

/**
 * Fails when the committed search index no longer matches Registry items,
 * derived Collections, or searchable route metadata.
 */
const expected = await buildSearchIndex();
const committed = await readFile(searchIndexArtifactPath, "utf8").catch(() => "");

if (committed !== expected) {
  process.stderr.write(
    "The committed search index does not match its Registry or route metadata sources.\n" +
      "Fix it with: npm run generate:search-index\n",
  );
  process.exit(1);
}

process.stdout.write("Search index matches the registry\n");
