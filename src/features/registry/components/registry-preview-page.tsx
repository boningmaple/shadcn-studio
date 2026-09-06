import type { ComponentType } from "react";

import type { VibeRegistryItemType } from "../types/registry";

export function RegistryPreviewPage({
  Preview,
  type,
}: {
  Preview: ComponentType;
  type: VibeRegistryItemType;
}) {
  if (type === "registry:component") {
    return (
      <div className="flex min-h-svh items-center justify-center p-4">
        <Preview />
      </div>
    );
  }

  return (
    <div className="min-h-svh w-full">
      <Preview />
    </div>
  );
}
