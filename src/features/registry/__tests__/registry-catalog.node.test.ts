import { describe, expect, it } from "vite-plus/test";

import {
  registryCollections,
  registryItemSummaries,
  registrySections,
} from "@/features/registry/lib/registry-catalog";
import type { RegistrySourceItem } from "@/features/registry/types/registry";

const sourceItems: RegistrySourceItem[] = [
  {
    categories: ["button"],
    description: "A quiet button.",
    files: [],
    name: "button-01",
    registryDependencies: ["button"],
    title: "Button 01",
    type: "registry:component",
  },
  {
    categories: ["button"],
    description: "A loud button.",
    files: [],
    name: "button-02",
    registryDependencies: ["button"],
    title: "Button 02",
    type: "registry:component",
  },
  {
    categories: ["authentication"],
    description: "A login form.",
    files: [],
    name: "login-form-01",
    registryDependencies: ["button"],
    title: "Login Form 01",
    type: "registry:block",
  },
];

describe("Registry catalog", () => {
  it("anchors Registry items to their Collection page", () => {
    expect(registryItemSummaries(sourceItems)[0]).toMatchObject({
      href: "/components/button#button-01",
      kind: "component",
    });
    expect(registryItemSummaries(sourceItems)[2]).toMatchObject({
      href: "/blocks/authentication#login-form-01",
      kind: "block",
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
