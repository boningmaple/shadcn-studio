import type * as React from "react";

import type { ComponentSlug, DemoIdOf } from "@/features/search/data/registry";

/**
 * The Demo previews a Component page renders, keyed by Demo id. The registry
 * holds no component references (ADR-0003), so each route module supplies its
 * own; the key type makes a Demo without a preview a compile error.
 */
export type DemoComponents<TSlug extends ComponentSlug> = Record<
  DemoIdOf<TSlug>,
  React.ComponentType
>;
