import { beforeAll, describe, expect, it } from "vite-plus/test";

import type { SearchHit } from "@/features/search/api/search.contract";
import {
  createSearchIndex,
  findHits,
  type SearchIndex,
  type SearchRecord,
} from "@/features/search/lib/search-index";

const records: SearchRecord[] = [
  {
    description: "A button with a pending state.",
    href: "/components/button/button-01",
    id: "registry-item:button-01",
    kind: "registry-item",
    name: "button-01",
    title: "Button 01",
  },
  {
    description: "Browse button components.",
    href: "/components/button",
    id: "collection:component:button",
    kind: "collection",
    name: "button",
    title: "Button Components",
  },
  {
    description: "A card Registry item that mentions signal.",
    href: "/components/card/card-01",
    id: "registry-item:card-01",
    kind: "registry-item",
    name: "card-01",
    title: "Card 01",
  },
  {
    description: "An ordinary application page.",
    href: "/signal-title",
    id: "route:signal-title",
    kind: "route",
    name: "ordinary-route",
    title: "Signal title",
  },
  {
    description: "An ordinary application page.",
    href: "/signal-name",
    id: "route:signal-name",
    kind: "route",
    name: "signal-name",
    title: "Ordinary page",
  },
  ...Array.from({ length: 25 }, (_, index) => ({
    description: "A sparkline Registry item.",
    href: `/components/chart/sparkline-${index + 1}`,
    id: `registry-item:sparkline-${index + 1}`,
    kind: "registry-item" as const,
    name: `sparkline-${index + 1}`,
    title: `Sparkline ${index + 1}`,
  })),
];

let index: SearchIndex;

beforeAll(async () => {
  index = await createSearchIndex(records);
});

const titlesOf = (hits: SearchHit[]) => hits.map((hit) => hit.title);
const query = async (term: string) => titlesOf(await findHits(index, term));

describe("findHits", () => {
  it("finds Registry items and their Collection page", async () => {
    const titles = await query("button");
    expect(titles).toContain("Button 01");
    expect(titles).toContain("Button Components");
  });

  it("orders name, title, and description matches by their boosts", async () => {
    const titles = await query("signal");
    expect(titles.indexOf("Ordinary page")).toBeLessThan(titles.indexOf("Signal title"));
    expect(titles.indexOf("Signal title")).toBeLessThan(titles.indexOf("Card 01"));
  });

  it("tolerates a single-character typo", async () => {
    expect(await query("buton")).toContain("Button Components");
  });

  it("requires every search term to match", async () => {
    expect(await query("button stroopwafel")).toEqual([]);
  });

  it("caps broad queries at 20 Hits", async () => {
    expect(await query("sparkline")).toHaveLength(20);
  });

  it("answers empty and whitespace-only queries with no Hits", async () => {
    expect(await query("")).toEqual([]);
    expect(await query("   ")).toEqual([]);
  });
});

describe("Hits", () => {
  it("carries the complete Search record and its Orama score", async () => {
    const hit = (await findHits(index, "card-01"))[0];

    expect(hit).toEqual({
      description: "A card Registry item that mentions signal.",
      href: "/components/card/card-01",
      id: "registry-item:card-01",
      kind: "registry-item",
      name: "card-01",
      score: expect.any(Number),
      title: "Card 01",
    });
  });
});
