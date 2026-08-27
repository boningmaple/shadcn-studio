import { CheckIcon, CopyIcon, LoaderCircleIcon } from "lucide-react";
import * as React from "react";

import { useComponentCode } from "@/features/demo-preview/api/use-component-code";
import { HighlightedCode } from "@/features/demo-preview/components/highlighted-code";
import type { ComponentEntry, Demo } from "@/features/search/data/registry";
import { Button } from "@/features/ui-shadcn/react-aria/button";
import { ScrollArea } from "@/features/ui-shadcn/react-aria/scroll-area";
import { Tooltip, TooltipTrigger } from "@/features/ui-shadcn/react-aria/tooltip";
import { cn } from "@/lib/utils";

/** How long the copy control stays confirmed before offering to copy again. */
const copiedDuration = 2000;

type DemoCodePanelProps = {
  /**
   * Sizing for whichever of the three states is showing, so a placement's
   * height does not jump as the code arrives.
   */
  className?: string;
  component: ComponentEntry;
  demo: Demo;
  /** Whether the code scrolls within the panel, or the placement scrolls it. */
  scroll?: boolean;
  /** A heading beside the copy control, where the placement wants one. */
  title?: string;
};

/**
 * One Demo's source, wherever it is shown.
 *
 * Asks for the code when it mounts, so a placement only has to decide *when*
 * to show it. A failure is offered as "Try again" rather than retried behind
 * the visitor's back — the same bargain ADR-0004 strikes for search.
 */
export function DemoCodePanel({
  className,
  component,
  demo,
  scroll = false,
  title,
}: DemoCodePanelProps) {
  const { codeState, loadCode } = useComponentCode(component, demo);
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    void loadCode();
  }, [loadCode]);

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), copiedDuration);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function copyCode() {
    if (codeState.status !== "success") {
      return;
    }

    await navigator.clipboard.writeText(codeState.payload.code);
    setCopied(true);
  }

  const code =
    codeState.status !== "success" ? null : (
      <HighlightedCode
        className={cn(scroll && "rounded-none border-0", className)}
        html={codeState.payload.html}
      />
    );

  return (
    <div>
      {title === undefined && codeState.status !== "success" ? null : (
        <div className="mb-3 flex min-h-8 items-center justify-between gap-4">
          {title === undefined ? null : (
            <h3 className="font-heading text-base font-semibold">{title}</h3>
          )}
          {codeState.status === "success" ? (
            <TooltipTrigger delay={300}>
              <Button
                aria-label={copied ? "Code copied" : "Copy code"}
                className="ml-auto"
                onPress={copyCode}
                size="icon-sm"
                variant="ghost"
              >
                {copied ? <CheckIcon /> : <CopyIcon />}
              </Button>
              <Tooltip>{copied ? "Copied" : "Copy code"}</Tooltip>
            </TooltipTrigger>
          ) : null}
        </div>
      )}

      {codeState.status === "success" ? (
        scroll ? (
          <ScrollArea className="max-h-[38rem] rounded-md border bg-card">{code}</ScrollArea>
        ) : (
          code
        )
      ) : codeState.status === "error" ? (
        <div
          className={cn(
            "flex flex-col items-center justify-center gap-4 rounded-md border bg-muted/20 p-6 text-center",
            className,
          )}
          role="alert"
        >
          <p className="text-sm text-muted-foreground">The code example could not be loaded.</p>
          <Button onPress={loadCode} variant="outline">
            Try again
          </Button>
        </div>
      ) : (
        <output
          className={cn(
            "flex items-center justify-center gap-2 rounded-md border bg-muted/20 text-sm text-muted-foreground",
            className,
          )}
        >
          <LoaderCircleIcon className="animate-spin" />
          Loading code
        </output>
      )}
    </div>
  );
}
