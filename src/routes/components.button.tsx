"use client";

import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { CheckIcon, Code2Icon, CopyIcon, LoaderCircleIcon } from "lucide-react";

import Button01 from "@/components/button/button-01";
import Button02 from "@/components/button/button-02";
import Button03 from "@/components/button/button-03";
import Button04 from "@/components/button/button-04";
import Button05 from "@/components/button/button-05";
import Button06 from "@/components/button/button-06";
import Button07 from "@/components/button/button-07";
import Button08 from "@/components/button/button-08";
import Button09 from "@/components/button/button-09";
import Button10 from "@/components/button/button-10";
import Button11 from "@/components/button/button-11";
import Button12 from "@/components/button/button-12";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export const Route = createFileRoute("/components/button")({
  component: ButtonComponentsPage,
  head: () => ({
    meta: [
      {
        title: "Button Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ButtonComponentsPage() {
  return (
    <div className="mx-auto w-full max-w-350 py-6 sm:px-2 sm:py-10">
      <header className="max-w-4xl">
        <h1 className="font-heading text-3xl font-semibold tracking-normal sm:text-4xl">
          Button Components
        </h1>
        <p className="mt-4 max-w-3xl text-base leading-7 text-muted-foreground sm:text-lg">
          Explore a focused collection of accessible button patterns built with
          React Aria, React, and Tailwind CSS. Inspect each example and adapt it
          for your interface.
        </p>
      </header>

      <section
        aria-labelledby="button-variants-title"
        className="mt-10 overflow-hidden rounded-lg border bg-card sm:mt-12"
      >
        <div className="flex h-14 items-center border-b bg-muted/45 px-5">
          <h2
            className="font-heading text-base font-medium"
            id="button-variants-title"
          >
            Button Variants
          </h2>
        </div>
        <div className="-mr-px -mb-px grid sm:grid-cols-2 lg:grid-cols-3">
          {buttonExamples.map((example) => (
            <ButtonExampleCard example={example} key={example.id} />
          ))}
        </div>
      </section>
    </div>
  );
}

type ButtonExample = {
  component: React.ComponentType;
  id: string;
  name: string;
};

function ButtonExampleCard({ example }: { example: ButtonExample }) {
  const Preview = example.component;

  return (
    <article
      aria-label={example.name}
      className="group/item relative flex min-h-57.5 items-center justify-center border-r border-b border-dashed px-6 py-16"
    >
      <span className="pointer-events-none absolute top-4 left-4 text-sm text-muted-foreground opacity-0 transition-opacity group-hover/item:opacity-100 [@media(hover:none)]:opacity-100">
        {example.name}
      </span>
      <div className="absolute top-2 right-2 z-10 opacity-0 transition-opacity group-hover/item:opacity-100 [@media(hover:none)]:opacity-100">
        <CodeDialog example={example} />
      </div>
      <Preview />
    </article>
  );
}

type ButtonCodeState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; payload: ButtonCodePayload }
  | { status: "error" };

type ButtonCodePayload = {
  code: string;
  html: string;
};

function CodeDialog({ example }: { example: ButtonExample }) {
  const [codeState, setCodeState] = React.useState<ButtonCodeState>({
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
        `${import.meta.env.BASE_URL}generated/button-${example.id}.json`,
      );

      if (!response.ok) {
        throw new Error(`Code request failed with status ${response.status}`);
      }

      const payload: unknown = await response.json();

      if (!isButtonCodePayload(payload)) {
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
        aria-label={`View code for ${example.name}`}
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
          <DialogTitle className="text-lg">{example.name}</DialogTitle>
          <DialogDescription>
            The complete TSX source for this button example.
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

function isButtonCodePayload(value: unknown): value is ButtonCodePayload {
  return (
    typeof value === "object" &&
    value !== null &&
    "code" in value &&
    typeof value.code === "string" &&
    "html" in value &&
    typeof value.html === "string"
  );
}

const buttonExamples: ButtonExample[] = [
  { component: Button01, id: "01", name: "Button 1" },
  { component: Button02, id: "02", name: "Button 2" },
  { component: Button03, id: "03", name: "Button 3" },
  { component: Button04, id: "04", name: "Button 4" },
  { component: Button05, id: "05", name: "Button 5" },
  { component: Button06, id: "06", name: "Button 6" },
  { component: Button07, id: "07", name: "Button 7" },
  { component: Button08, id: "08", name: "Button 8" },
  { component: Button09, id: "09", name: "Button 9" },
  { component: Button10, id: "10", name: "Button 10" },
  { component: Button11, id: "11", name: "Button 11" },
  { component: Button12, id: "12", name: "Button 12" },
];
