import { writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { persist } from "@orama/plugin-data-persistence";

import { components } from "../src/features/search/data/registry.ts";
import { createSearchIndex } from "../src/features/search/lib/search-index.ts";

/**
 * Builds the search index at build time and commits it, so the server never
 * indexes on boot (ADR-0001).
 *
 * The artifact deliberately does not go under `public/`: only the server reads
 * it, and importing out of the public directory is a Vite anti-pattern.
 */
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const searchIndexArtifactPath = path.join(
  projectRoot,
  "src/features/search/data/search-index.gen.json",
);

export async function buildSearchIndex(): Promise<string> {
  const index = await createSearchIndex(components);
  const persisted = await persist(index, "json");

  if (typeof persisted !== "string") {
    throw new Error(
      `Expected the JSON persistence format to produce a string, got ${typeof persisted}`,
    );
  }

  return `${persisted}\n`;
}

if (import.meta.filename === process.argv[1]) {
  const artifact = await buildSearchIndex();
  await writeFile(searchIndexArtifactPath, artifact, "utf8");

  const demoCount = components.reduce((total, component) => total + component.demos.length, 0);

  process.stdout.write(
    `Indexed ${components.length} Components and ${demoCount} Demos into ${searchIndexArtifactPath}\n`,
  );
}
