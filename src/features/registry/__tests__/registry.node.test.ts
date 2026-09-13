import { mkdir, mkdtemp, readFile, readdir, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vite-plus/test";

import registryJson from "../../../../registry.json";
import {
  readBuiltRegistryOutput,
  renderRegistryOutputs,
  replaceBuiltRegistryData,
  writeRegistryOutputs,
} from "../../../../scripts/build-registry.ts";
import {
  vibeBuiltRegistryItemSchema,
  vibeRegistryItemSchema,
  vibeRegistrySchema,
} from "../types/registry.ts";

const roots: string[] = [];

afterEach(async () => {
  await Promise.all(roots.splice(0).map((root) => rm(root, { force: true, recursive: true })));
});

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

describe("renderRegistryOutputs", () => {
  it("renders flat Section and Collection routes", () => {
    const { registry, paths } = renderFixture();
    const [routeFiles] = renderRegistryOutputs(registry, paths.routesRootPath);

    expect(routeFiles.get(path.join(paths.routesRootPath, "components/index.tsx"))).toContain(
      'createFileRoute("/_rootLayout/components/")',
    );
    expect(routeFiles.get(path.join(paths.routesRootPath, "components/button.tsx"))).toContain(
      'createFileRoute("/_rootLayout/components/button")',
    );
  });

  it("uses canonical Preview routes and existing metadata", () => {
    const { paths, registry: source } = renderFixture();
    const [routeFiles] = renderRegistryOutputs(source, paths.routesRootPath);
    const section = routeFiles.get(path.join(paths.routesRootPath, "components/index.tsx"));
    const collection = routeFiles.get(path.join(paths.routesRootPath, "components/button.tsx"));

    expect(section).toContain('"itemCount":2');
    expect(collection).not.toContain("@/registry/vibe-ui/button-01/button-01.tsx");
    expect(collection).not.toContain("Preview:");
    expect(collection).toContain('staticData: { ariaLabel: "Button" }');
    expect(collection).toContain(
      'import registryItemButton01 from "@/features/registry/data/items/button-01.json";',
    );
    expect(collection).toContain(
      "const items = [registryItemButton01, registryItemButton02] as VibeBuiltRegistryItem[];",
    );
    expect(collection).not.toContain("previewHref");
  });

  it("renders a concrete isolated Preview route for every Registry item", () => {
    const { paths, registry: source } = renderFixture();
    const [routeFiles] = renderRegistryOutputs(source, paths.routesRootPath);
    const componentPreview = routeFiles.get(
      path.resolve("/project/src/routes/preview/components/button/button-01.tsx"),
    );
    const pagePreview = routeFiles.get(
      path.resolve("/project/src/routes/preview/pages/landing-pages/landing-page-01.tsx"),
    );

    expect(componentPreview).toContain('createFileRoute("/preview/components/button/button-01")');
    expect(componentPreview).toContain(
      'import Button01Preview from "@/registry/vibe-ui/button-01/button-01.tsx";',
    );
    expect(componentPreview).not.toContain("previewThemeSearchSchema");
    expect(componentPreview).not.toContain("previewThemeHydrationScript");
    expect(componentPreview).not.toContain("Route.useSearch()");
    expect(componentPreview).not.toContain("theme={theme}");
    expect(componentPreview).toContain('title: "Button 01 Preview – VibeUI"');
    expect(componentPreview).toContain('type="registry:component"');
    expect(pagePreview).toContain('type="registry:page"');
  });

  it("separates routes when item types share a category", () => {
    const fixture = renderFixture([
      registryItem({ name: "button-01" }),
      registryItem({ name: "button-hero-01", type: "registry:block" }),
    ]);
    const [routeFiles] = renderRegistryOutputs(fixture.registry, fixture.paths.routesRootPath);

    expect(
      routeFiles.get(path.join(fixture.paths.routesRootPath, "components/button.tsx")),
    ).toContain('createFileRoute("/_rootLayout/components/button")');
    expect(routeFiles.get(path.join(fixture.paths.routesRootPath, "blocks/button.tsx"))).toContain(
      'createFileRoute("/_rootLayout/blocks/button")',
    );
  });

  it("preserves authored item order within a Collection", () => {
    const fixture = renderFixture([
      registryItem({ name: "button-02", title: "Button 02" }),
      registryItem({ name: "button-01", title: "Button 01" }),
    ]);
    const [routeFiles] = renderRegistryOutputs(fixture.registry, fixture.paths.routesRootPath);
    const collection = routeFiles.get(
      path.join(fixture.paths.routesRootPath, "components/button.tsx"),
    );

    expect(collection).toBeDefined();
    if (collection === undefined) return;
    expect(collection.indexOf("registryItemButton02,")).toBeLessThan(
      collection.indexOf("registryItemButton01]"),
    );
  });

  it("renders ordered sidebar sections and Collection links", () => {
    const { paths, registry: source } = renderFixture();
    const [, sidebarContent] = renderRegistryOutputs(source, paths.routesRootPath);

    expect(sidebarContent).toContain('"label": "Components"');
    expect(sidebarContent).toContain('"href": "/components/button"');
    expect(sidebarContent).toContain('"label": "Blocks"');
    expect(sidebarContent).toContain('"href": "/blocks/hero-section"');
  });

  it("uses the build-registry generated header", () => {
    const { paths, registry: source } = renderFixture();
    const [routeFiles, sidebarContent] = renderRegistryOutputs(source, paths.routesRootPath);

    expect(sidebarContent).toMatch(/^\/\/ @generated by scripts\/build-registry\.ts/);
    for (const content of routeFiles.values()) {
      expect(content).toMatch(/^\/\/ @generated by scripts\/build-registry\.ts/);
    }
  });
});

describe("readBuiltRegistryOutput", () => {
  it("accepts a complete generated Registry and preserves aggregate ordering", async () => {
    const fixture = await builtOutputFixture([
      registryItem({ name: "button-02", title: "Button 02" }),
      registryItem({ name: "button-01" }),
    ]);

    await expect(readBuiltRegistryOutput(fixture.itemsPath)).resolves.toMatchObject({
      items: [{ name: "button-02" }, { name: "button-01" }],
    });
  });

  it("rejects missing and extra individual item files", async () => {
    const fixture = await builtOutputFixture();
    await rm(path.join(fixture.itemsPath, "button-01.json"));
    await seed(
      path.join(fixture.itemsPath, "extra-item.json"),
      JSON.stringify(builtRegistryItem(registryItem({ name: "extra-item" }))),
    );

    await expect(readBuiltRegistryOutput(fixture.itemsPath)).rejects.toThrow(
      /Missing: button-01\.json.*Extra: extra-item\.json/,
    );
  });

  it("rejects individual item metadata that differs from the aggregate", async () => {
    const fixture = await builtOutputFixture();
    const mismatchedItem = builtRegistryItem(registryItem({ title: "Different title" }));
    await seed(path.join(fixture.itemsPath, "button-01.json"), JSON.stringify(mismatchedItem));

    await expect(readBuiltRegistryOutput(fixture.itemsPath)).rejects.toThrow(
      /button-01\.json does not match the aggregate metadata/,
    );
  });
});

describe("replaceBuiltRegistryData", () => {
  it("replaces application and public data with byte-identical generated output", async () => {
    const fixture = await builtOutputFixture();
    const itemsPath = path.join(fixture.root, "application-items");
    const publicRegistryPath = path.join(fixture.root, "public-r");
    await seed(path.join(itemsPath, "stale.json"), "stale\n");
    await seed(path.join(publicRegistryPath, "stale.json"), "stale\n");

    await replaceBuiltRegistryData(fixture.itemsPath, itemsPath, publicRegistryPath);

    const expectedFileNames = (await readdir(fixture.itemsPath)).sort();
    await expect(readdir(itemsPath)).resolves.toEqual(expectedFileNames);
    await expect(readdir(publicRegistryPath)).resolves.toEqual(expectedFileNames);
    for (const fileName of expectedFileNames) {
      const expected = await readFile(path.join(fixture.itemsPath, fileName));
      await expect(readFile(path.join(itemsPath, fileName))).resolves.toEqual(expected);
      await expect(readFile(path.join(publicRegistryPath, fileName))).resolves.toEqual(expected);
    }
  });
});

describe("writeRegistryOutputs", () => {
  it("replaces builder-owned route directories and preserves the Preview layout", async () => {
    const fixture = await outputFixture();
    await Promise.all(
      ["components", "blocks", "pages"].map((segment) =>
        seed(path.join(fixture.paths.routesRootPath, segment, "old.tsx"), "handwritten\n"),
      ),
    );
    const previewRoot = path.join(path.dirname(fixture.paths.routesRootPath), "preview");
    await seed(path.join(previewRoot, "route.tsx"), "handwritten Preview layout\n");
    await seed(path.join(previewRoot, "components/old.tsx"), "stale generated Preview\n");

    await writeRegistryOutputs(
      fixture.registry,
      fixture.paths.routesRootPath,
      fixture.paths.sidebarFilePath,
    );

    await Promise.all(
      ["components", "blocks", "pages"].map(async (segment) => {
        await expect(
          readFile(path.join(fixture.paths.routesRootPath, segment, "old.tsx"), "utf8"),
        ).rejects.toMatchObject({ code: "ENOENT" });
      }),
    );
    await expect(
      readFile(path.join(fixture.paths.routesRootPath, "components/button.tsx"), "utf8"),
    ).resolves.toContain('createFileRoute("/_rootLayout/components/button")');
    await expect(readFile(path.join(previewRoot, "route.tsx"), "utf8")).resolves.toBe(
      "handwritten Preview layout\n",
    );
    await expect(
      readFile(path.join(previewRoot, "components/old.tsx"), "utf8"),
    ).rejects.toMatchObject({ code: "ENOENT" });
    await expect(
      readFile(
        path.join(
          path.dirname(fixture.paths.routesRootPath),
          "preview/components/button/button-01.tsx",
        ),
        "utf8",
      ),
    ).resolves.toContain('createFileRoute("/preview/components/button/button-01")');
  });

  it("removes section directories absent from the Registry", async () => {
    const fixture = await outputFixture([registryItem()]);
    await seed(path.join(fixture.paths.routesRootPath, "blocks/old.tsx"), "old\n");
    await seed(path.join(fixture.paths.routesRootPath, "pages/old.tsx"), "old\n");

    await writeRegistryOutputs(
      fixture.registry,
      fixture.paths.routesRootPath,
      fixture.paths.sidebarFilePath,
    );

    await expect(stat(path.join(fixture.paths.routesRootPath, "blocks"))).rejects.toMatchObject({
      code: "ENOENT",
    });
    await expect(stat(path.join(fixture.paths.routesRootPath, "pages"))).rejects.toMatchObject({
      code: "ENOENT",
    });
  });

  it("replaces the generated sidebar module", async () => {
    const fixture = await outputFixture();
    await seed(fixture.paths.sidebarFilePath, "handwritten\n");

    await writeRegistryOutputs(
      fixture.registry,
      fixture.paths.routesRootPath,
      fixture.paths.sidebarFilePath,
    );

    await expect(readFile(fixture.paths.sidebarFilePath, "utf8")).resolves.toContain(
      "export const registrySidebarSections",
    );
  });
});

function renderFixture(items = defaultItems()) {
  const routesRootPath = path.resolve("/project/src/routes/_rootLayout");

  return {
    registry: vibeRegistrySchema.parse(registry({ items })),
    paths: { routesRootPath },
  };
}

async function outputFixture(items = defaultItems()) {
  const root = await mkdtemp(path.join(tmpdir(), "vibeui-registry-"));
  roots.push(root);

  return {
    paths: {
      routesRootPath: path.join(root, "src/routes/_rootLayout"),
      sidebarFilePath: path.join(root, "src/features/registry/data/registry-sidebar.gen.ts"),
    },
    registry: vibeRegistrySchema.parse(registry({ items })),
  };
}

async function builtOutputFixture(items = defaultItems()) {
  const root = await mkdtemp(path.join(tmpdir(), "vibeui-built-registry-"));
  roots.push(root);
  const itemsPath = path.join(root, "items");
  await seed(path.join(itemsPath, "registry.json"), JSON.stringify(registry({ items })));

  for (const item of items) {
    await seed(path.join(itemsPath, `${item.name}.json`), JSON.stringify(builtRegistryItem(item)));
  }

  return { itemsPath, root };
}

async function seed(file: string, content: string): Promise<void> {
  await mkdir(path.dirname(file), { recursive: true });
  await writeFile(file, content, "utf8");
}

function defaultItems() {
  return [
    registryItem({ name: "button-01" }),
    registryItem({ description: "A loud button.", name: "button-02", title: "Button 02" }),
    registryItem({
      categories: ["hero-section"],
      name: "hero-section-01",
      title: "Hero Section 01",
      type: "registry:block",
    }),
    registryItem({
      categories: ["landing-pages"],
      name: "landing-page-01",
      title: "Landing Page 01",
      type: "registry:page",
    }),
  ];
}

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
