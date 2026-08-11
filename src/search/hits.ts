/**
 * The search wire format, shared by the Server Route and the palette.
 *
 * Free of any Orama import so the client can hold these types without pulling
 * the engine into the browser bundle.
 */

/** Which kind of thing a Search record stands for. */
export type SearchRecordKind = "component" | "demo";

/** A Search record a query matched, carrying the score that orders it. */
export type Hit = {
  componentName: string;
  /** Present on Demo Hits only. */
  demoName?: string;
  href: string;
  kind: SearchRecordKind;
  score: number;
};

export function isHits(value: unknown): value is Hit[] {
  return Array.isArray(value) && value.every(isHit);
}

function isHit(value: unknown): value is Hit {
  if (typeof value !== "object" || value === null) {
    return false;
  }

  const hit = value as Record<string, unknown>;

  return (
    typeof hit.componentName === "string" &&
    (hit.demoName === undefined || typeof hit.demoName === "string") &&
    typeof hit.href === "string" &&
    (hit.kind === "component" || hit.kind === "demo") &&
    typeof hit.score === "number"
  );
}
