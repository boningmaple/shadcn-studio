import { beforeAll, describe, expect, it } from "vite-plus/test";

import type { SearchHit } from "@/features/search/api/search.contract";
import type { ComponentEntry } from "@/features/search/data/registry";
import { createSearchIndex, findHits, type SearchIndex } from "@/features/search/lib/search-index";

/**
 * A fixture catalogue rather than the real registry, so adding a Component to
 * VibeUI never breaks a ranking expectation. Assertions are on the order and
 * membership of Hits; scores are an Orama detail that shifts on any tuning.
 */
const componentEntry = (
  entry: Pick<ComponentEntry, "demos" | "description" | "name" | "slug">,
): ComponentEntry => ({
  ...entry,
  codeArtifactPrefix: `md-${entry.slug}`,
  demoNoun: entry.name.toLowerCase(),
  href: `/material-design/components/${entry.slug}`,
  sectionId: `${entry.slug}-patterns-title`,
  sectionTitle: `${entry.name} Patterns`,
});

const catalogue: ComponentEntry[] = [
  componentEntry({
    demos: [
      { id: "01", name: "Elevated button states" },
      { id: "02", name: "Material 3 shapes" },
    ],
    description: "Explore a collection of buttons built with Material Design.",
    name: "Button",
    slug: "button",
  }),
  componentEntry({
    demos: [
      { id: "01", name: "Card with a button and actions" },
      { id: "02", name: "Elevated checklist card" },
    ],
    description: "Explore elevated, filled, and outlined card containers.",
    name: "Card",
    slug: "card",
  }),
  componentEntry({
    demos: [{ id: "01", name: "Filter chips" }],
    // Mentions "button" in prose only, to pin the bottom of the boost ladder.
    description: "Compact button-like elements for filters and selections.",
    name: "Chips",
    slug: "chips",
  }),
  componentEntry({
    // More Demos than the result limit, all matching one distinctive term.
    // This also skews the corpus toward Demos, which is what makes the
    // Component-outranks-its-Demos expectations below a real guard: padding
    // the unused indexed fields with empty strings reverses them.
    demos: Array.from({ length: 25 }, (_, index) => ({
      id: String(index + 1).padStart(2, "0"),
      name: `Sparkline variant ${index + 1}`,
    })),
    description: "Explore chart primitives.",
    name: "Chart",
    slug: "chart",
  }),
];

let index: SearchIndex;

beforeAll(async () => {
  index = await createSearchIndex(catalogue);
});

const labelsOf = (hits: SearchHit[]) => hits.map((hit) => hit.demoName ?? hit.componentName);

const query = async (term: string) => labelsOf(await findHits(index, term));

describe("findHits", () => {
  it("ranks a Component above the Demos that merely mention it", async () => {
    const labels = await query("button");

    expect(labels[0]).toBe("Button");
    expect(labels).toContain("Elevated button states");
    expect(labels).toContain("Card with a button and actions");
  });

  it("orders the three indexed fields by their boosts", async () => {
    const labels = await query("button");

    // Component name (3) above Demo name (2) above description (1).
    expect(labels.indexOf("Button")).toBeLessThan(labels.indexOf("Elevated button states"));
    expect(labels.indexOf("Elevated button states")).toBeLessThan(labels.indexOf("Chips"));
  });

  it("matches a Demo by its own name", async () => {
    expect(await query("checklist")).toEqual(["Elevated checklist card"]);
  });

  it("finds Demos of more than one Component for a shared term", async () => {
    expect(await query("elevated")).toEqual(
      expect.arrayContaining(["Elevated button states", "Elevated checklist card"]),
    );
  });

  it("tolerates a single-character typo", async () => {
    expect((await query("buton"))[0]).toBe("Button");
    expect(await query("checklst")).toEqual(["Elevated checklist card"]);
  });

  it("returns nothing when only some of the terms match", async () => {
    expect(await query("elevated")).not.toHaveLength(0);
    expect(await query("elevated stroopwafel")).toEqual([]);
  });

  it("returns nothing when no term matches", async () => {
    expect(await query("stroopwafel")).toEqual([]);
  });

  it("caps a broad query at the result limit", async () => {
    expect(await query("sparkline")).toHaveLength(20);
  });

  // Nothing has been asked, so there is nothing to answer. The palette meets a
  // visitor who has typed nothing with quick links instead (ADR-0006).
  it("answers an empty query with no Hits", async () => {
    expect(await query("")).toEqual([]);
  });

  it("treats a whitespace-only query as empty", async () => {
    expect(await query("   ")).toEqual([]);
  });
});

describe("Hits", () => {
  it("carries a Component's destination and no Demo name", async () => {
    const [hit] = await findHits(index, "checkbox chips");
    const chips = (await findHits(index, "chips")).find(
      (candidate) => candidate.kind === "component",
    );

    expect(hit).toBeUndefined();
    expect(chips).toEqual({
      componentName: "Chips",
      href: "/material-design/components/chips",
      kind: "component",
      score: expect.any(Number),
    });
  });

  it("labels a Demo with the Component it belongs to, and links to its anchor", async () => {
    const [hit] = await findHits(index, "checklist");

    expect(hit).toEqual({
      componentName: "Card",
      demoName: "Elevated checklist card",
      href: "/material-design/components/card#md-card-02",
      kind: "demo",
      score: expect.any(Number),
    });
  });
});
