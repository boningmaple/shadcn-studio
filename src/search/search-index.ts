import { create, insertMultiple, search, type Orama } from "@orama/orama";

// Relative rather than aliased: the build script runs on plain node, like the
// existing component-code generator, and node does not read tsconfig paths.
import { demoAnchorId, type ComponentEntry } from "../registry.ts";
import type { Hit } from "./hits.ts";

/**
 * One schema covers both kinds of Search record, distinguished by `kind`.
 *
 * `kind` is an enum rather than indexed text, so "component" is never itself a
 * matchable term. Everything else a Hit carries — the owning Component's name
 * and the destination href — rides along as unindexed payload.
 *
 * The default English tokenizer is deliberate and load-bearing. A custom
 * tokenizer, stemmer, or stop-word list cannot survive persistence and would
 * silently change results (ADR-0001).
 */
const searchSchema = {
  componentName: "string",
  demoName: "string",
  description: "string",
  kind: "enum",
} as const;

export type SearchIndex = Orama<typeof searchSchema>;

/**
 * What every Search record carries but nothing searches.
 *
 * `component` is how a Demo Hit is labelled with the Component it belongs to.
 * It is payload rather than indexed text on purpose: a Demo record that also
 * matched on its Component's name would outscore that Component for a query
 * naming it, since it would match one more field at a comparable boost.
 */
type SearchRecordPayload = {
  component: string;
  href: string;
  id: string;
};

/**
 * A record carries only the indexed fields that apply to it, rather than
 * padding the rest with empty strings. BM25 normalises a match by how long its
 * field is relative to the corpus average for that field, and 188 empty
 * `componentName` values drag that average toward zero — which penalises the
 * one field the boosts rank highest. Omitting them keeps each field's
 * statistics drawn from the records that actually have it.
 */
type ComponentRecord = SearchRecordPayload & {
  componentName: string;
  description: string;
  kind: "component";
};

type DemoRecord = SearchRecordPayload & {
  demoName: string;
  kind: "demo";
};

type SearchRecord = ComponentRecord | DemoRecord;

/** Ranking configuration. Tuning it is what the unit suite guards. */
const boost = { componentName: 3, demoName: 2, description: 1 };
const searchableProperties: ("componentName" | "demoName" | "description")[] = [
  "componentName",
  "demoName",
  "description",
];
/** One character, so a slip of the finger still finds what was meant. */
const tolerance = 1;
const limit = 20;
/** Zero requires every term to match: at ~226 records precision beats recall. */
const threshold = 0;

function searchRecordsOf(
  components: readonly ComponentEntry[],
): SearchRecord[] {
  return components.flatMap((component) => [
    {
      component: component.name,
      componentName: component.name,
      description: component.description,
      href: component.href,
      id: `component:${component.slug}`,
      kind: "component" as const,
    },
    ...component.demos.map((demo) => {
      const anchorId = demoAnchorId(component, demo);

      return {
        component: component.name,
        demoName: demo.name,
        href: `${component.href}#${anchorId}`,
        id: `demo:${anchorId}`,
        kind: "demo" as const,
      };
    }),
  ]);
}

export async function createSearchIndex(
  components: readonly ComponentEntry[],
): Promise<SearchIndex> {
  const index: SearchIndex = create({ schema: searchSchema });
  await insertMultiple(index, searchRecordsOf(components));

  return index;
}

/**
 * The one place ranking happens. The Server Route wraps this; the unit suite
 * drives it against a fixture index.
 *
 * An empty query is a navigation jump rather than a search, so it answers with
 * every Component and no Demo.
 */
export async function findHits(
  index: SearchIndex,
  query: string,
): Promise<Hit[]> {
  const term = query.trim();
  const results = await (term === ""
    ? searchComponents(index)
    : search(index, {
        boost,
        limit,
        properties: searchableProperties,
        term,
        threshold,
        tolerance,
      }));

  return results.hits.map(({ document, score }) => {
    const record = document as unknown as SearchRecord;

    return {
      componentName: record.component,
      ...(record.kind === "demo" ? { demoName: record.demoName } : {}),
      href: record.href,
      kind: record.kind,
      score,
    } satisfies Hit;
  });
}

async function searchComponents(index: SearchIndex) {
  const onlyComponents = { term: "", where: { kind: { eq: "component" } } };
  // A count-then-fetch, so the idle list is every Component rather than
  // whatever the ranked `limit` happens to be.
  const { count } = await search(index, { ...onlyComponents, limit: 0 });

  return search(index, { ...onlyComponents, limit: count });
}
