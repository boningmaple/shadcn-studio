import * as React from "react";

import { demoArtifacts } from "@/features/demo-preview/lib/demo-artifacts";
import type { ComponentEntry, Demo } from "@/features/search/data/registry";

export type ComponentCodePayload = {
  code: string;
  html: string;
};

export type ComponentCodeState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "success"; payload: ComponentCodePayload }
  | { status: "error" };

/**
 * One Demo's generated source, fetched on demand.
 *
 * Asked at most once per outcome: the code for a Demo changes only on deploy,
 * so a success is never re-fetched, and a failure is left for the visitor to
 * retry rather than retried on its own.
 *
 * `loadCode` keeps one identity for as long as it points at one Demo. That is
 * load-bearing where a caller loads in an effect — an identity that changed
 * with the state would re-run that effect on failure and retry forever.
 */
export function useComponentCode(component: ComponentEntry, demo: Demo) {
  const { codeUrl } = demoArtifacts(component, demo);
  const [codeState, setCodeState] = React.useState<ComponentCodeState>({
    status: "idle",
  });
  /** Whether a request is in flight or has already succeeded. */
  const settled = React.useRef(false);

  const loadCode = React.useCallback(async () => {
    if (settled.current) {
      return;
    }

    settled.current = true;
    setCodeState({ status: "loading" });

    try {
      const response = await fetch(codeUrl);

      if (!response.ok) {
        throw new Error(`Code request failed with status ${response.status}`);
      }

      const payload: unknown = await response.json();

      if (!isComponentCodePayload(payload)) {
        throw new Error("Code response has an invalid shape");
      }

      setCodeState({ status: "success", payload });
    } catch {
      settled.current = false;
      setCodeState({ status: "error" });
    }
  }, [codeUrl]);

  return { codeState, loadCode };
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
