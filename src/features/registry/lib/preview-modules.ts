import { lazy, type ComponentType, type LazyExoticComponent } from "react";

const previewModules = import.meta.glob("/registry/vibe-ui/*/preview.tsx", {
  import: "default",
});
const previews = new Map<string, LazyExoticComponent<ComponentType>>();

export function registryPreviewComponent(name: string): LazyExoticComponent<ComponentType> | null {
  const existing = previews.get(name);
  if (existing !== undefined) return existing;

  const load = previewModules[`/registry/vibe-ui/${name}/preview.tsx`];
  if (load === undefined) return null;

  const preview = lazy(async () => ({ default: (await load()) as ComponentType }));
  previews.set(name, preview);
  return preview;
}
