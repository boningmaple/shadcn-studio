import { Suspense } from "react";

import { Spinner } from "@/components/ui/spinner";

import { registryPreviewComponent } from "../lib/preview-modules.ts";

export function RegistryPreviewPage({
  embedded = false,
  name,
}: {
  embedded?: boolean;
  name: string;
}) {
  const Preview = registryPreviewComponent(name);

  if (Preview === null) {
    return <p className="p-6">Preview not found.</p>;
  }

  return (
    <Suspense
      fallback={
        <output
          className={`flex items-center justify-center gap-2 text-sm text-muted-foreground ${embedded ? "min-h-[34rem]" : "min-h-svh"}`}
        >
          <Spinner /> Loading preview
        </output>
      }
    >
      <div className={embedded ? "min-h-[34rem] [&>main]:min-h-[34rem]" : undefined}>
        <Preview />
      </div>
    </Suspense>
  );
}
