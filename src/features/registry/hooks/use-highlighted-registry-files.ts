import { useQuery } from "@tanstack/react-query";

import { highlightRegistryFiles } from "../lib/highlight-code.ts";
import type { VibeBuiltRegistryItem } from "../types/registry.ts";

export function useHighlightedRegistryFiles(item: VibeBuiltRegistryItem) {
  return useQuery({
    queryKey: ["registry-item-code", item.name, item.files],
    queryFn: () => highlightRegistryFiles(item.files),
    retry: false,
    staleTime: Infinity,
  });
}
