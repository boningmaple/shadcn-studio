import type { ComponentType } from "react";

import type { PreviewTheme } from "../types/preview-theme";
import type { VibeRegistryItemType } from "../types/registry";
import { RegistryPreviewThemeBoundary, useRegistryPreviewTheme } from "./registry-preview-theme";

export function RegistryPreviewPage({
  Preview,
  theme: initialTheme,
  type,
}: {
  Preview: ComponentType;
  theme?: PreviewTheme;
  type: VibeRegistryItemType;
}) {
  const { theme } = useRegistryPreviewTheme(initialTheme);

  if (type === "registry:component") {
    return (
      <RegistryPreviewThemeBoundary
        className="flex min-h-svh items-center justify-center p-4"
        theme={theme}
      >
        <Preview />
      </RegistryPreviewThemeBoundary>
    );
  }

  return (
    <RegistryPreviewThemeBoundary className="min-h-svh w-full" theme={theme}>
      <Preview />
    </RegistryPreviewThemeBoundary>
  );
}
