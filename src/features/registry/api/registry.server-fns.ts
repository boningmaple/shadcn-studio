import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import type {
  RegistryItemGroupSummary,
  RegistryItemShowcaseGroup,
  RegistryNavigationResult,
} from "../types/registry.ts";

const typeSchema = z.enum(["registry:block", "registry:component", "registry:page"]);

export const getRegistryNavigation = createServerFn({ method: "GET" }).handler(
  async (): Promise<RegistryNavigationResult> => {
    try {
      const { allRegistrySections } = await import("../server/registry.server.ts");
      return {
        sections: allRegistrySections().map((section) => ({
          collections: section.collections.map(({ href, title }) => ({ href, title })),
          kind: section.kind,
        })),
        status: "ok",
      };
    } catch {
      return { status: "error" };
    }
  },
);

export const getRegistryItemGroupsByType = createServerFn({ method: "GET" })
  .validator(z.object({ type: typeSchema }))
  .handler(async ({ data }): Promise<RegistryItemGroupSummary[]> => {
    const { registryItemGroupSummariesByType } = await import("../server/registry.server.ts");
    return registryItemGroupSummariesByType(data.type);
  });

export const getRegistryItemGroup = createServerFn({ method: "GET" })
  .validator(z.object({ category: z.string(), type: typeSchema }))
  .handler(async ({ data }): Promise<RegistryItemShowcaseGroup | null> => {
    const { findRegistryItemShowcaseGroup } = await import("../server/registry.server.ts");
    return findRegistryItemShowcaseGroup(data.type, data.category) ?? null;
  });
