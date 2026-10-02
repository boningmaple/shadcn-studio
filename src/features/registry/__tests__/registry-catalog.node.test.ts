import { describe, expect, it } from "vite-plus/test";

import {
  registryCollections,
  registryItemSummaries,
  registrySections,
  previewUrl,
} from "@/features/registry/lib/registry-catalog";
import type { VibeRegistryItem } from "@/features/registry/types/registry";

const sourceItems: VibeRegistryItem[] = [
  {
    meta: { height: 120 },
    categories: ["components", "button"],
    description: "A quiet button.",
    files: [],
    name: "button-01",
    registryDependencies: ["button"],
    title: "Button 01",
    type: "registry:component",
  },
  {
    meta: { height: 120 },
    categories: ["components", "button"],
    description: "A loud button.",
    files: [],
    name: "button-02",
    registryDependencies: ["button"],
    title: "Button 02",
    type: "registry:component",
  },
  {
    meta: { height: 120 },
    categories: ["blocks", "authentication"],
    description: "A login form.",
    files: [],
    name: "login-form-01",
    registryDependencies: ["button"],
    title: "Login Form 01",
    type: "registry:component",
  },
];

describe("Registry catalog", () => {
  it("builds canonical Preview routes from Registry item metadata", () => {
    expect(previewUrl(sourceItems[0]!)).toBe("/preview/components/button/button-01");
    expect(previewUrl(sourceItems[2]!)).toBe("/preview/blocks/authentication/login-form-01");
  });

  it("anchors Registry items to their Collection page", () => {
    expect(registryItemSummaries(sourceItems)[0]).toMatchObject({
      href: "/components/button#button-01",
      section: "components",
    });
    expect(registryItemSummaries(sourceItems)[2]).toMatchObject({
      href: "/blocks/authentication#login-form-01",
      section: "blocks",
    });
  });

  it("derives Collection pages without duplicating Registry item metadata", () => {
    const collections = registryCollections(registryItemSummaries(sourceItems));
    const buttons = collections.find((collection) => collection.href === "/components/button");

    expect(buttons).toMatchObject({
      title: "Button",
      items: [{ name: "button-01" }, { name: "button-02" }],
    });
  });

  it("derives top-level sections and category links from Registry items", () => {
    expect(registrySections(registryItemSummaries(sourceItems))).toMatchObject([
      {
        href: "/components",
        title: "Components",
        collections: [{ href: "/components/button", title: "Button" }],
      },
      {
        href: "/blocks",
        title: "Blocks",
        collections: [{ href: "/blocks/authentication", title: "Authentication" }],
      },
    ]);
  });
});
