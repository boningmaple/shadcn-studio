import { z } from "zod";

/**
 * The search wire format, shared by the Server Route and the palette.
 *
 * Free of any Orama import so the client can hold these types without pulling
 * the engine into the browser bundle.
 */

/** Where the palette asks its questions. */
export const searchEndpoint = "/api/search";

export function searchRequestUrl(query: string): string {
  return `${searchEndpoint}?q=${encodeURIComponent(query)}`;
}

const hitSchema = z.object({
  componentName: z.string(),
  /** Present on Demo Hits only. */
  demoName: z.string().optional(),
  href: z.string(),
  /** Which kind of thing the matched Search record stands for. */
  kind: z.enum(["component", "demo"]),
  score: z.number(),
});

export const hitsSchema = z.array(hitSchema);

/** A Search record a query matched, carrying the score that orders it. */
export type Hit = z.infer<typeof hitSchema>;
