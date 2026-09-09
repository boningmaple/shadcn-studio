import type { ComponentType } from "react";

import type { VibeRegistryItemType } from "../types/registry";

export function RegistryPreviewPage({
  Preview,
  type,
}: {
  Preview: ComponentType;
  type: VibeRegistryItemType;
}) {
  return (
    <div
      className={
        type === "registry:component"
          ? "flex min-h-svh items-center justify-center p-4"
          : "min-h-svh w-full"
      }
    >
      <Preview />
    </div>
  );
}
