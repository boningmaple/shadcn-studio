import * as React from "react";

import { demoAnchorId, type ComponentEntry, type Demo } from "@/registry";
import { cn } from "@/lib/utils";

export type ComponentCodeState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; payload: ComponentCodePayload }
  | { status: "error" };

export type ComponentCodePayload = {
  code: string;
  html: string;
};

export function useComponentCode(component: ComponentEntry, demo: Demo) {
  const artifactId = demoAnchorId(component, demo);
  const [codeState, setCodeState] = React.useState<ComponentCodeState>({
    status: "idle",
  });

  const loadCode = React.useCallback(async () => {
    if (codeState.status === "loading" || codeState.status === "success") {
      return;
    }

    setCodeState({ status: "loading" });

    try {
      const response = await fetch(
        `${import.meta.env.BASE_URL}generated/${artifactId}.json`,
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
  }, [artifactId, codeState.status]);

  return { codeState, loadCode };
}

export function HighlightedCode({
  className,
  html,
}: {
  className?: string;
  html: string;
}) {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-md border [&_.shiki]:m-0 [&_.shiki]:overflow-x-auto [&_.shiki]:p-5 [&_.shiki]:font-mono [&_.shiki]:text-[13px] [&_.shiki]:leading-6 [&_.shiki_code]:block [&_.shiki_code]:min-w-max",
        className,
      )}
      dangerouslySetInnerHTML={{ __html: html }}
    />
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
