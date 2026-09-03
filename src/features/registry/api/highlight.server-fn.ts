import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type { VibeHighlightedRegistryFile } from "../types/registry.ts";

const registryFileSchema = z.object({
  content: z.string(),
  path: z.string(),
  target: z.string().optional(),
  type: z.string(),
});

export const highlightRegistryFiles = createServerFn({ method: "POST" })
  .validator(z.object({ files: z.array(registryFileSchema) }))
  .handler(async ({ data }): Promise<VibeHighlightedRegistryFile[]> => {
    const { highlightFiles } = await import("../server/highlight.server.ts");
    return highlightFiles(data.files);
  });
