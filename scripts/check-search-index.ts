import { readFile } from "node:fs/promises";

import {
  buildSearchIndex,
  searchIndexArtifactPath,
} from "./build-search-index.ts";

/**
 * Fails when the committed search index no longer matches the registry.
 *
 * Without this, adding or renaming a Demo and forgetting to regenerate makes
 * that Demo silently unfindable — the failure mode search is least likely to
 * notice. This repository has no CI yet, so the check hangs off the pre-commit
 * hook; when CI arrives it belongs there too, which is the stronger home.
 */
const expected = await buildSearchIndex();
const committed = await readFile(searchIndexArtifactPath, "utf8").catch(
  () => "",
);

if (committed !== expected) {
  process.stderr.write(
    "The committed search index does not match the registry, so new or renamed Demos would be unfindable.\n" +
      "Fix it with: npm run generate:search-index\n",
  );
  process.exit(1);
}

process.stdout.write("Search index matches the registry\n");
