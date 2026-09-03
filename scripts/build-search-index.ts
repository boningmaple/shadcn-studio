import { readdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";

import { persist } from "@orama/plugin-data-persistence";

import sourceRegistry from "../registry.json" with { type: "json" };
import {
  registryCollections,
  registryItemSummaries,
  registrySections,
} from "../src/features/registry/lib/registry-catalog.ts";
import type { VibeRegistry } from "../src/features/registry/types/registry.ts";
import { createSearchIndex, type SearchRecord } from "../src/features/search/lib/search-index.ts";
import type { RouteSearchMetadata } from "../src/features/search/types/route-search-metadata.ts";

const projectRoot = path.resolve(import.meta.dirname, "..");

export const searchIndexArtifactPath = path.join(
  projectRoot,
  "src/features/search/data/search-index.gen.json",
);

export async function buildSearchRecords(): Promise<SearchRecord[]> {
  const source = sourceRegistry as VibeRegistry;
  const items = registryItemSummaries(source.items);
  const collections = registryCollections(items);
  const sections = registrySections(items);
  const routeMetadata = await searchableRoutes(path.join(projectRoot, "src/routes"));

  return [
    ...items.map((item) => ({
      description: item.description,
      href: item.href,
      id: `registry-item:${item.name}`,
      kind: "registry-item" as const,
      name: item.name,
      title: item.title,
    })),
    ...collections.map((collection) => ({
      description: collection.description,
      href: collection.href,
      id: `collection:${collection.type}:${collection.category}`,
      kind: "collection" as const,
      name: collection.category,
      title: collection.title,
    })),
    ...sections.map((section) => ({
      description: section.description,
      href: section.href,
      id: `route:${section.type}`,
      kind: "route" as const,
      name: section.type,
      title: section.title,
    })),
    ...routeMetadata.map((route) => ({
      ...route,
      id: `route:${route.name}`,
      kind: "route" as const,
    })),
  ];
}

export async function buildSearchIndex(): Promise<string> {
  const index = await createSearchIndex(await buildSearchRecords());
  const persisted = await persist(index, "json");

  if (typeof persisted !== "string") {
    throw new Error(
      `Expected the JSON persistence format to produce a string, got ${typeof persisted}`,
    );
  }

  return `${persisted}\n`;
}

async function searchableRoutes(directory: string): Promise<RouteSearchMetadata[]> {
  const files = await searchMetadataFiles(directory);
  const records: RouteSearchMetadata[] = [];

  for (const file of files) {
    const module = (await import(pathToFileURL(file).href)) as {
      searchMetadata?: RouteSearchMetadata;
    };
    if (module.searchMetadata !== undefined) records.push(module.searchMetadata);
  }

  return records;
}

async function searchMetadataFiles(directory: string): Promise<string[]> {
  const files: string[] = [];

  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const entryPath = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await searchMetadataFiles(entryPath)));
    else if (entry.name.endsWith(".search.ts")) files.push(entryPath);
  }

  return files.sort();
}

if (import.meta.filename === process.argv[1]) {
  const records = await buildSearchRecords();
  await writeFile(searchIndexArtifactPath, await buildSearchIndex(), "utf8");
  process.stdout.write(
    `Indexed ${records.length} Search records into ${searchIndexArtifactPath}\n`,
  );
}
