import { z } from "zod";

export const searchQueryMaxLength = 200;

const searchQuerySchema = z.strictObject({
  q: z.string().trim().max(searchQueryMaxLength).default(""),
});

export const searchHitSchema = z.strictObject({
  componentName: z.string(),
  /** Present on Demo Hits only. */
  demoName: z.string().optional(),
  href: z.string(),
  /** Which kind of Search record matched the query. */
  kind: z.enum(["component", "demo"]),
  score: z.number(),
});

const searchSuccessResponseSchema = z.array(searchHitSchema);
const searchBadRequestResponseSchema = z.object({
  error: z.enum(["search_query_too_long", "invalid_search_query"]),
});

export const searchContract = {
  method: "GET",
  path: "/api/search",
  query: searchQuerySchema,
  responses: {
    200: searchSuccessResponseSchema,
    400: searchBadRequestResponseSchema,
  },
  staleTimeMs: 5 * 60 * 1000,
} as const;

export type SearchQuery = z.infer<typeof searchContract.query>;
export type SearchHit = z.infer<typeof searchHitSchema>;
export type SearchSuccessResponse = z.infer<(typeof searchContract.responses)[200]>;
export type SearchBadRequestResponse = z.infer<(typeof searchContract.responses)[400]>;
export type SearchErrorCode = SearchBadRequestResponse["error"];

export function searchRequestUrl(query: string): string {
  const parsedQuery = searchContract.query.parse({ q: query });
  const searchParams = new URLSearchParams({ q: parsedQuery.q });

  return `${searchContract.path}?${searchParams.toString()}`;
}

export function searchQueryInputFromSearchParams(searchParams: URLSearchParams): unknown {
  const input: Record<string, unknown> = {};

  for (const key of new Set(searchParams.keys())) {
    const values = searchParams.getAll(key);
    input[key] = values.length === 1 ? values[0] : values;
  }

  return input;
}
