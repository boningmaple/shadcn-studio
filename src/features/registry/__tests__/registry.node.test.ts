import { describe, expect, it } from "vite-plus/test";

import registryJson from "../../../../registry.json";
import {
  vibeBuiltRegistryItemSchema,
  vibeRegistryItemSchema,
  vibeRegistrySchema,
} from "../types/registry.ts";

describe("vibeRegistryItemSchema", () => {
  it("accepts a Vibe Registry item", () => {
    expect(vibeRegistryItemSchema.parse(registryItem())).toMatchObject({ name: "button-01" });
  });

  it.each([
    ["unsafe item name", { name: "Button 01" }],
    ["reserved item name", { name: "index" }],
    ["unsupported item type", { type: "registry:ui" }],
    ["blank title", { title: " " }],
    ["blank description", { description: " " }],
    ["multiple categories", { categories: ["button", "action"] }],
    ["unsafe category", { categories: ["Button"] }],
    ["reserved category", { categories: ["route"] }],
    ["missing canonical file declaration", { files: [] }],
  ])("rejects %s", (_label, changes) => {
    expect(() => vibeRegistryItemSchema.parse(registryItem(changes))).toThrow();
  });

  it("retains shadcn Registry item validation", () => {
    expect(() => vibeRegistryItemSchema.parse(registryItem({ dependencies: [1] }))).toThrow(
      /Invalid shadcn Registry item/,
    );
  });
});

describe("vibeBuiltRegistryItemSchema", () => {
  it("accepts source content for every built Registry item file", () => {
    expect(vibeBuiltRegistryItemSchema.parse(builtRegistryItem(registryItem()))).toMatchObject({
      name: "button-01",
    });
  });

  it("rejects a built Registry item when any file has no source content", () => {
    const item = builtRegistryItem(registryItem({ name: "button-02" }));
    delete (item.files[0] as { content?: string }).content;

    expect(() => vibeBuiltRegistryItemSchema.parse(item)).toThrow();
  });
});

describe("vibeRegistrySchema", () => {
  it("accepts the project Registry", () => {
    expect(vibeRegistrySchema.parse(registryJson).name).toBe("Vibe UI");
  });

  it("requires the Vibe UI Registry name", () => {
    expect(() => vibeRegistrySchema.parse(registry({ name: "Other UI" }))).toThrow();
  });

  it("requires items to be declared directly", () => {
    expect(() =>
      vibeRegistrySchema.parse({
        homepage: "https://example.com",
        include: ["registry/vibe-ui/button-01/registry.json"],
        name: "Vibe UI",
      }),
    ).toThrow();
  });

  it("rejects duplicate item names and route identities", () => {
    const item = registryItem();
    const result = vibeRegistrySchema.safeParse(registry({ items: [item, item] }));

    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues.map((issue) => issue.message)).toEqual(
        expect.arrayContaining([
          "Duplicate Registry item name: button-01.",
          "Duplicate route identity: registry:component/button/button-01.",
        ]),
      );
    }
  });

  it("retains shadcn Registry validation", () => {
    expect(() => vibeRegistrySchema.parse(registry({ homepage: 42 }))).toThrow(
      /Invalid shadcn Registry/,
    );
  });
});

function registryItem(changes: Record<string, unknown> = {}) {
  const name = typeof changes.name === "string" ? changes.name : "button-01";
  const type = typeof changes.type === "string" ? changes.type : "registry:component";

  return {
    name,
    title: "Button 01",
    type,
    description: "A button.",
    files: [
      {
        path: `registry/vibe-ui/${name}/${name}.tsx`,
        target: `@components/vibe-ui/${name}/${name}.tsx`,
        type,
      },
    ],
    categories: ["button"],
    ...changes,
  };
}

function builtRegistryItem(item: ReturnType<typeof registryItem>) {
  return {
    $schema: "https://ui.shadcn.com/schema/registry-item.json",
    ...item,
    files: item.files.map((file) => ({ ...file, content: `export default ${item.name};\n` })),
  };
}

function registry(changes: Record<string, unknown> = {}) {
  return {
    name: "Vibe UI",
    homepage: "https://example.com",
    items: [registryItem()],
    ...changes,
  };
}
