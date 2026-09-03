import { Suspense, type ReactNode } from "react";

import { Spinner } from "@/components/ui/spinner";

export function RegistryItemPreview({
  embedded = false,
  preview,
}: {
  embedded?: boolean;
  preview: ReactNode;
}) {
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
      <div className={embedded ? "min-h-[34rem] [&>main]:min-h-[34rem]" : undefined}>{preview}</div>
    </Suspense>
  );
}
