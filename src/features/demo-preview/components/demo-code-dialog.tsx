import { Code2Icon } from "lucide-react";

import { DemoCodePanel } from "@/features/demo-preview/components/demo-code-panel";
import type { ComponentEntry, Demo } from "@/features/search/data/registry";
import { Button } from "@/features/ui-shadcn/react-aria/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/features/ui-shadcn/react-aria/dialog";

/** The code affordance on a Demo card, and the dialog it opens. */
export function DemoCodeDialog({ component, demo }: { component: ComponentEntry; demo: Demo }) {
  return (
    <DialogTrigger>
      <Button
        aria-label={`View code for ${demo.name}`}
        className="group/code pointer-events-auto relative overflow-visible text-muted-foreground hover:bg-muted hover:text-foreground"
        size="icon"
        variant="ghost"
      >
        <Code2Icon />
        <span
          className="pointer-events-none absolute top-full right-0 z-50 mt-2 w-max rounded-md bg-foreground px-3 py-1.5 text-xs text-background opacity-0 shadow-sm transition-opacity after:absolute after:-top-1 after:right-3 after:size-2 after:rotate-45 after:bg-foreground group-hover/code:opacity-100"
          role="tooltip"
        >
          View code
        </span>
      </Button>
      <Dialog className="max-h-[85vh] gap-0 overflow-hidden p-0 sm:max-w-4xl" isDismissable>
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle className="text-lg">{demo.name}</DialogTitle>
          <DialogDescription>
            The complete TSX source for this {component.demoNoun}.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[calc(85vh-6.5rem)] overflow-y-auto p-4 sm:p-6">
          <DemoCodePanel
            className="min-h-48"
            component={component}
            demo={demo}
            title="Manual Code"
          />
        </div>
      </Dialog>
    </DialogTrigger>
  );
}
