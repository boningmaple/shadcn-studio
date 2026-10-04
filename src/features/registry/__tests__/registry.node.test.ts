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
    ["missing prompt", { meta: { height: 120 } }],
    ["empty prompt", { meta: { height: 120, prompt: "" } }],
    ["blank prompt", { meta: { height: 120, prompt: " \n\t " } }],
    ["non-string prompt", { meta: { height: 120, prompt: 42 } }],
    ["missing meta", { meta: undefined }],
    ["missing height", { meta: { height: undefined, prompt: "Create a button." } }],
    ["zero height", { meta: { height: 0, prompt: "Create a button." } }],
    ["negative height", { meta: { height: -1, prompt: "Create a button." } }],
    ["fractional height", { meta: { height: 1.5, prompt: "Create a button." } }],
    ["string height", { meta: { height: "120", prompt: "Create a button." } }],
    ["unsafe item name", { name: "Button 01" }],
    ["reserved item name", { name: "index" }],
    ["unsupported item type", { type: "registry:ui" }],
    ["blank title", { title: " " }],
    ["blank description", { description: " " }],
    ["missing collection", { categories: ["components"] }],
    ["extra category", { categories: ["components", "button", "action"] }],
    ["unknown section", { categories: ["unknown", "button"] }],
    ["legacy item type", { type: "registry:block" }],
    ["unsafe category", { categories: ["components", "Button"] }],
    ["reserved category", { categories: ["components", "route"] }],
    ["missing canonical file declaration", { files: [] }],
  ])("rejects %s", (_label, changes) => {
    expect(() => vibeRegistryItemSchema.parse(registryItem(changes))).toThrow();
  });

  it("preserves prompt whitespace verbatim", () => {
    const item = registryItem();
    expect(vibeRegistryItemSchema.parse(item).meta.prompt).toBe(item.meta.prompt);
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

  it("rejects a built Registry item when any file has no installation target", () => {
    const item = builtRegistryItem(registryItem({ name: "button-02" }));
    delete (item.files[0] as { target?: string }).target;

    expect(() => vibeBuiltRegistryItemSchema.parse(item)).toThrow();
  });

  it("rejects target extensions outside the Shiki bundle", () => {
    const item = builtRegistryItem(registryItem({ name: "button-02" }));
    item.files[0]!.target = "@components/vibe-ui/button-02/button-02.txt";

    expect(() => vibeBuiltRegistryItemSchema.parse(item)).toThrow(/Shiki bundle/);
  });

  it("accepts target extensions exposed as Shiki language aliases", () => {
    const item = builtRegistryItem(registryItem({ name: "button-02" }));
    item.files[0]!.target = "@components/vibe-ui/button-02/button-02.typescript";

    expect(vibeBuiltRegistryItemSchema.parse(item).files[0]?.target).toBe(
      "@components/vibe-ui/button-02/button-02.typescript",
    );
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
          "Duplicate route identity: components/button/button-01.",
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
    meta: { height: 120, prompt: "  Create a button.\n\nKeep <details> as plain text.  " },
    type,
    description: "A button.",
    files: [
      {
        path: `registry/vibe-ui/${name}/${name}.tsx`,
        target: `@components/vibe-ui/${name}/${name}.tsx`,
        type,
      },
    ],
    categories: ["components", "button"],
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
