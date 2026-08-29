import { create, insertMultiple, search, type Orama } from "@orama/orama";

import type { SearchHit, SearchRecordKind } from "../api/search.contract.ts";

const searchSchema = {
  description: "string",
  kind: "enum",
  name: "string",
  title: "string",
} as const;

export type SearchIndex = Orama<typeof searchSchema>;

export type SearchRecord = {
  description: string;
  href: string;
  id: string;
  kind: SearchRecordKind;
  name: string;
  title: string;
};

const boost = { description: 1, name: 3, title: 2 };
const searchableProperties: ("description" | "name" | "title")[] = ["name", "title", "description"];
const tolerance = 1;
const limit = 20;
const threshold = 0;

export async function createSearchIndex(records: readonly SearchRecord[]): Promise<SearchIndex> {
  const index: SearchIndex = create({ schema: searchSchema });
  await insertMultiple(index, [...records]);
  return index;
}

export async function findHits(index: SearchIndex, query: string): Promise<SearchHit[]> {
  const term = query.trim();
  if (term === "") return [];

  const results = await search(index, {
    boost,
    limit,
    properties: searchableProperties,
    term,
    threshold,
    tolerance,
  });

  return results.hits.map(({ document, score }) => {
    const record = document as unknown as SearchRecord;
    return { ...record, score };
  });
}
