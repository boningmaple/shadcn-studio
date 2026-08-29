import { describe, expect, it } from "vite-plus/test";

import {
  findRegistryItemShowcaseGroup,
  groupRegistryItemsByTypeAndCategory,
  registryItemGroupSummariesByType,
} from "@/features/registry/server/registry.server";
import type { RegistryItem } from "@/features/registry/types/registry";

const registryItems: RegistryItem[] = [
  {
    name: "button-01",
    title: "Button 01",
    description: "A quiet button.",
    type: "registry:component",
    registryDependencies: ["button"],
    files: [],
    categories: ["button"],
  },
  {
    name: "button-02",
    title: "Button 02",
    description: "A loud button.",
    type: "registry:component",
    registryDependencies: ["button"],
    files: [],
    categories: ["button"],
  },
  {
    name: "card-01",
    title: "Card 01",
    description: "A compact card.",
    type: "registry:component",
    registryDependencies: ["card"],
    files: [],
    categories: ["card"],
  },
  {
    name: "button-hero-01",
    title: "Button Hero 01",
    description: "A button hero section.",
    type: "registry:block",
    registryDependencies: ["button"],
    files: [],
    categories: ["button"],
  },
];

const findGroup = (type: RegistryItem["type"], category: string) =>
  groupRegistryItemsByTypeAndCategory(registryItems).find(
    (group) => group.type === type && group.category === category,
  );

describe("groupRegistryItemsByTypeAndCategory", () => {
  it("groups registry items by type and first category", () => {
    expect(findGroup("registry:component", "button")?.items).toEqual([
      registryItems[0],
      registryItems[1],
    ]);
    expect(findGroup("registry:component", "card")?.items).toEqual([registryItems[2]]);
    expect(findGroup("registry:block", "button")?.items).toEqual([registryItems[3]]);
  });

  it("exposes only category counts and showcase text to route loaders", () => {
    expect(registryItemGroupSummariesByType("registry:block")).toEqual([
      { category: "hero-section", itemCount: 1 },
    ]);
    expect(findRegistryItemShowcaseGroup("registry:block", "hero-section")).toEqual({
      category: "hero-section",
      items: [
        {
          description: "A centered product hero with a focused call to action.",
          name: "hero-section-01",
          title: "Hero Section 01",
        },
      ],
    });
  });
});
