import { queryOptions, useQuery } from "@tanstack/react-query";
import { z } from "zod";

import type { VibeHighlightedRegistryFile } from "../types/registry.ts";

const builtItemSchema = z.object({
  categories: z.array(z.string()),
  description: z.string(),
  files: z
    .array(
      z.object({
        content: z.string(),
        path: z.string(),
        target: z.string().optional(),
        type: z.string(),
      }),
    )
    .min(1),
  name: z.string(),
  registryDependencies: z.array(z.string()).optional(),
  title: z.string(),
  type: z.enum(["registry:component", "registry:block", "registry:page"]),
});

export function registryItemQueryOptions(name: string) {
  return queryOptions({
    queryKey: ["registry-item", name],
    queryFn: async ({ signal }): Promise<VibeHighlightedRegistryFile[]> => {
      const response = await fetch(`/r/${name}.json`, { signal });
      if (!response.ok) throw new Error(`Registry item request failed with ${response.status}.`);

      const item = builtItemSchema.parse(await response.json());
      const { highlightRegistryFiles } = await import("../lib/highlight-code.ts");
      return highlightRegistryFiles(item.files);
    },
    networkMode: "always",
    refetchOnWindowFocus: false,
    retry: false,
    staleTime: Infinity,
  });
}

export function useRegistryCode(name: string, enabled: boolean) {
  return useQuery({ ...registryItemQueryOptions(name), enabled });
}
