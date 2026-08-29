import { useServerFn } from "@tanstack/react-start";
import { useCallback, useEffect, useState } from "react";
import { z } from "zod";

import { highlightRegistryFiles } from "../api/highlight.server-fn.ts";
import type { HighlightedRegistryFile } from "../types/registry.ts";

const builtItemSchema = z.object({
  categories: z.array(z.string()),
  description: z.string(),
  files: z.array(
    z.object({
      content: z.string(),
      path: z.string(),
      target: z.string().optional(),
      type: z.string(),
    }),
  ),
  name: z.string(),
  registryDependencies: z.array(z.string()),
  title: z.string(),
  type: z.enum(["registry:component", "registry:block", "registry:page"]),
});

type RegistryCodeState =
  | { status: "idle" }
  | { status: "loading" }
  | { files: HighlightedRegistryFile[]; highlightingFailed: boolean; status: "success" }
  | { error: Error; status: "error" };

export function useRegistryCode(name: string, enabled: boolean) {
  const highlight = useServerFn(highlightRegistryFiles);
  const [attempt, setAttempt] = useState(0);
  const [state, setState] = useState<RegistryCodeState>({ status: "idle" });

  useEffect(() => {
    if (!enabled) return;

    const controller = new AbortController();
    setState({ status: "loading" });

    void (async () => {
      try {
        const response = await fetch(`/r/${name}.json`, { signal: controller.signal });
        if (!response.ok) throw new Error(`Registry item request failed with ${response.status}.`);

        const item = builtItemSchema.parse(await response.json());

        try {
          const files = await highlight({ data: { files: item.files } });
          if (!controller.signal.aborted) {
            setState({ files, highlightingFailed: false, status: "success" });
          }
        } catch {
          if (!controller.signal.aborted) {
            setState({ files: item.files, highlightingFailed: true, status: "success" });
          }
        }
      } catch (error) {
        if (!controller.signal.aborted) {
          setState({
            error: error instanceof Error ? error : new Error(String(error)),
            status: "error",
          });
        }
      }
    })();

    return () => controller.abort();
  }, [attempt, enabled, highlight, name]);

  const retry = useCallback(() => setAttempt((value) => value + 1), []);

  return { retry, state };
}
