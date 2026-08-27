import type * as React from "react";

import { DemoCodeDialog } from "@/features/demo-preview/components/demo-code-dialog";
import { demoAnchorId, type ComponentEntry, type Demo } from "@/features/search/data/registry";
import { cn } from "@/lib/utils";

type DemoCardProps = {
  component: ComponentEntry;
  demo: Demo;
  isMarked: boolean;
  preview: React.ComponentType;
};

/** One Demo, in one cell of its Component's grid. */
export function DemoCard({ component, demo, isMarked, preview: Preview }: DemoCardProps) {
  return (
    <article
      aria-label={demo.name}
      className={cn(
        "group/item relative flex min-h-57.5 scroll-mt-20 items-center justify-center border-r border-b border-dashed px-6 py-16 transition-colors duration-700",
        demo.wide && "sm:col-span-2 lg:col-span-3",
        // An inset ring, not a regular one: the cards sit flush against a
        // section that clips its overflow, so a ring drawn outside the border
        // box is cut off at the edges.
        "data-[marked=true]:bg-primary/8 data-[marked=true]:inset-ring-2 data-[marked=true]:inset-ring-ring/60 data-[marked=true]:duration-150",
      )}
      data-marked={isMarked}
      id={demoAnchorId(component, demo)}
    >
      <span className="pointer-events-none absolute top-4 left-4 text-sm text-muted-foreground opacity-0 transition-opacity group-hover/item:opacity-100 [@media(hover:none)]:opacity-100">
        {demo.name}
      </span>
      <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover/item:opacity-100 [@media(hover:none)]:opacity-100">
        <DemoCodeDialog component={component} demo={demo} />
      </div>
      <Preview />
    </article>
  );
}
