import type * as React from "react";

import { demoAnchorId, type ComponentEntry, type Demo } from "@/registry";

export type DemoPreviewTheme = "light" | "dark";

type DemoModule = {
  default: React.ComponentType;
};

const demoModules = import.meta.glob<DemoModule>(
  "../material-design/components/md-*/demos/md-*.tsx",
);

export function getStandaloneDemoHref({
  component,
  demo,
  theme,
}: {
  component: ComponentEntry;
  demo: Demo;
  theme: DemoPreviewTheme;
}) {
  const basePath = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${basePath}${component.href}/${demo.id}?theme=${theme}`;
}

export function getDemoModuleLoader(component: ComponentEntry, demo: Demo) {
  const artifactId = demoAnchorId(component, demo);
  const modulePath = `../material-design/components/${component.codeArtifactPrefix}/demos/${artifactId}.tsx`;

  return demoModules[modulePath];
}
