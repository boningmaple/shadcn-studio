import * as React from "react";
import { useRouterState } from "@tanstack/react-router";
import { CheckIcon, Code2Icon, CopyIcon, LoaderCircleIcon } from "lucide-react";

import {
  demoAnchorId,
  getComponent,
  type ComponentEntry,
  type ComponentSlug,
  type Demo,
  type DemoIdOf,
} from "@/registry";
import { Button } from "@/ui/shadcn/react-aria/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/ui/shadcn/react-aria/dialog";
import { Tooltip, TooltipTrigger } from "@/ui/shadcn/react-aria/tooltip";
import { cn } from "@/lib/utils";

/**
 * The Demo previews a Component page renders, keyed by Demo id. The registry
 * holds no component references (ADR-0003), so each route module supplies its
 * own; the key type makes a Demo without a preview a compile error.
 */
export type DemoComponents<TSlug extends ComponentSlug> = Record<
  DemoIdOf<TSlug>,
  React.ComponentType
>;

type ComponentDemosPageProps<TSlug extends ComponentSlug> = {
  demoComponents: DemoComponents<TSlug>;
  slug: TSlug;
};

export function ComponentDemosPage<TSlug extends ComponentSlug>({
  demoComponents,
  slug,
}: ComponentDemosPageProps<TSlug>) {
  const component = getComponent(slug);
  const markedAnchorId = useMarkedAnchorId();
  // The exact keys are checked where the route module declares them; inside
  // this generic they are only known to be Demo ids of some Component.
  const previews: Record<string, React.ComponentType> = demoComponents;

  return (
    <div className="mx-auto w-full max-w-350 py-6 sm:px-2 sm:py-10">
      <header className="max-w-4xl">
        <h1 className="font-heading text-3xl font-semibold tracking-normal sm:text-4xl">
          {component.name}
        </h1>
        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
          {component.description}
        </p>
      </header>

      <section
        aria-labelledby={component.sectionId}
        className="mt-10 overflow-hidden rounded-lg border bg-card sm:mt-12"
      >
        <div className="flex h-14 items-center border-b bg-muted/45 px-5">
          <h2
            className="font-heading text-base font-medium"
            id={component.sectionId}
          >
            {component.sectionTitle}
          </h2>
        </div>
        <div className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
          {component.demos.map((demo) => (
            <DemoCard
              component={component}
              demo={demo}
              isMarked={demoAnchorId(component, demo) === markedAnchorId}
              key={demo.id}
              preview={previews[demo.id]}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

/**
 * How long a Demo stays marked after a link sends a visitor to it. Long enough
 * to find the card among ten near-identical ones, short enough that the mark
 * reads as an arrival rather than a selected state.
 */
const markDuration = 2500;

/**
 * The Demo the current fragment points at, for as long as it stays marked.
 *
 * Scrolling is the router's own hash behaviour, not ours; this only decides
 * what to mark once the visitor is there. It runs in an effect, so the server
 * — which never sees a fragment — and the first client render agree.
 */
function useMarkedAnchorId(): string | undefined {
  const hash = useRouterState({ select: (state) => state.location.hash });
  const [markedAnchorId, setMarkedAnchorId] = React.useState<string>();

  React.useEffect(() => {
    if (hash === "") {
      setMarkedAnchorId(undefined);
      return;
    }

    setMarkedAnchorId(hash);
    const timeout = window.setTimeout(
      () => setMarkedAnchorId(undefined),
      markDuration,
    );

    return () => window.clearTimeout(timeout);
  }, [hash]);

  return markedAnchorId;
}

type DemoCardProps = {
  component: ComponentEntry;
  demo: Demo;
  isMarked: boolean;
  preview: React.ComponentType;
};

function DemoCard({
  component,
  demo,
  isMarked,
  preview: Preview,
}: DemoCardProps) {
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
        <CodeDialog component={component} demo={demo} />
      </div>
      <Preview />
    </article>
  );
}

type ComponentCodeState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; payload: ComponentCodePayload }
  | { status: "error" };

type ComponentCodePayload = {
  code: string;
  html: string;
};

function CodeDialog({
  component,
  demo,
}: Pick<DemoCardProps, "component" | "demo">) {
  const [codeState, setCodeState] = React.useState<ComponentCodeState>({
    status: "idle",
  });
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const timeout = window.setTimeout(() => setCopied(false), 2000);
    return () => window.clearTimeout(timeout);
  }, [copied]);

  async function loadCode() {
    if (codeState.status === "loading" || codeState.status === "success") {
      return;
    }

    setCodeState({ status: "loading" });

    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}generated/${demoAnchorId(component, demo)}.json`,
      );

      if (!response.ok) {
        throw new Error(`Code request failed with status ${response.status}`);
      }

      const payload: unknown = await response.json();

      if (!isComponentCodePayload(payload)) {
        throw new Error("Code response has an invalid shape");
      }

      setCodeState({ status: "success", payload });
    } catch {
      setCodeState({ status: "error" });
    }
  }

  async function copyCode() {
    if (codeState.status !== "success") {
      return;
    }

    await navigator.clipboard.writeText(codeState.payload.code);
    setCopied(true);
  }

  return (
    <DialogTrigger>
      <Button
        aria-label={`View code for ${demo.name}`}
        className="group/code pointer-events-auto relative overflow-visible text-muted-foreground hover:bg-muted hover:text-foreground"
        onPress={loadCode}
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
      <Dialog
        className="max-h-[85vh] gap-0 overflow-hidden p-0 sm:max-w-4xl"
        isDismissable
      >
        <DialogHeader className="border-b px-6 py-5 pr-14">
          <DialogTitle className="text-lg">{demo.name}</DialogTitle>
          <DialogDescription>
            The complete TSX source for this {component.demoNoun}.
          </DialogDescription>
        </DialogHeader>
        <div className="max-h-[calc(85vh-6.5rem)] overflow-y-auto p-4 sm:p-6">
          <div className="mb-3 flex items-center justify-between gap-4">
            <h3 className="font-heading text-base font-semibold">
              Manual Code
            </h3>
            {codeState.status === "success" ? (
              <TooltipTrigger delay={300}>
                <Button
                  aria-label={copied ? "Code copied" : "Copy code"}
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
          {codeState.status === "success" ? (
            <div
              className="overflow-hidden rounded-md border bg-[#0d1117] [&_.shiki]:m-0 [&_.shiki]:overflow-x-auto [&_.shiki]:p-5 [&_.shiki]:font-mono [&_.shiki]:text-[13px] [&_.shiki]:leading-6 [&_.shiki_code]:block [&_.shiki_code]:min-w-max"
              dangerouslySetInnerHTML={{ __html: codeState.payload.html }}
            />
          ) : codeState.status === "error" ? (
            <div
              className="flex min-h-48 flex-col items-center justify-center gap-4 rounded-md border bg-muted/20 p-6 text-center"
              role="alert"
            >
              <p className="text-sm text-muted-foreground">
                The code example could not be loaded.
              </p>
              <Button onPress={loadCode} variant="outline">
                Try again
              </Button>
            </div>
          ) : (
            <div
              className="flex min-h-48 items-center justify-center gap-2 rounded-md border bg-muted/20 text-sm text-muted-foreground"
              role="status"
            >
              <LoaderCircleIcon className="animate-spin" />
              Loading code
            </div>
          )}
        </div>
      </Dialog>
    </DialogTrigger>
  );
}

function isComponentCodePayload(value: unknown): value is ComponentCodePayload {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    typeof value.code === "string" &&
    "html" in value &&
    typeof value.html === "string"
  );
}
