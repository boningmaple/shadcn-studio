import type * as React from "react";

import type { DemoPreviewTheme } from "@/features/demo-preview/types/demo-preview";
import { demoAnchorId, type ComponentEntry, type Demo } from "@/features/search/data/registry";

/**
 * Everything a single Demo is filed under, derived in one place.
 *
 * A Demo's anchor id — `md-button-01` — is also the stem of its source
 * filename and of the code artifact `scripts/generate-component-code.ts`
 * writes for it. Four call sites need one or another of the paths built from
 * it; deriving them here is what keeps the convention from being spelled out
 * four times and drifting in one of them.
 *
 * The id itself stays in the registry, which defines it — the search index
 * needs it without needing any of these paths.
 */
type DemoModule = {
  default: React.ComponentType;
};

/**
 * Every Demo source file, as lazy loaders keyed by path.
 *
 * The pattern has to be a literal Vite can see at build time, which is why it
 * is written out here rather than composed.
 */
const demoModules = import.meta.glob<DemoModule>(
  "../../ui-material-design/components/md-*/demos/md-*.tsx",
);

function demoModulePath(component: ComponentEntry, demo: Demo): string {
  const artifactId = demoAnchorId(component, demo);

  return `../../ui-material-design/components/${component.codeArtifactPrefix}/demos/${artifactId}.tsx`;
}

export type DemoArtifacts = {
  /** Where the generated TSX source for this Demo is served from. */
  codeUrl: string;
  /**
   * Loads this Demo's own module, or `undefined` when the registry names a
   * Demo that has no source file. `npm run generate:component-code` fails on
   * that mismatch, so it should not survive a build.
   */
  loadPreview: (() => Promise<DemoModule>) | undefined;
  /** The full-page preview of this Demo, in the theme asked for. */
  standaloneHref: (theme: DemoPreviewTheme) => string;
};

export function demoArtifacts(component: ComponentEntry, demo: Demo): DemoArtifacts {
  const artifactId = demoAnchorId(component, demo);
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");

  return {
    codeUrl: `${import.meta.env.BASE_URL}generated/${artifactId}.json`,
    loadPreview: demoModules[demoModulePath(component, demo)],
    standaloneHref: (theme) => `${basePath}${component.href}/${demo.id}?theme=${theme}`,
  };
}
