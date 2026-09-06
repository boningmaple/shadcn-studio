import { mkdir, mkdtemp, readFile, rm, stat, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";

import { afterEach, describe, expect, it } from "vite-plus/test";

import registryJson from "../../../../registry.json";
import { renderRegistryOutputs, writeRegistryOutputs } from "../../../../scripts/build-registry.ts";
import { vibeRegistryItemSchema, vibeRegistrySchema } from "../types/registry.ts";

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

  it("uses direct canonical Preview imports and existing metadata", () => {
    const { paths, registry: source } = renderFixture();
    const [routeFiles] = renderRegistryOutputs(source, paths.routesRootPath);
    const section = routeFiles.get(path.join(paths.routesRootPath, "components/index.tsx"));
    const collection = routeFiles.get(path.join(paths.routesRootPath, "components/button.tsx"));

    expect(section).toContain('"itemCount":2');
    expect(collection).toContain(
      'import Button01Preview1 from "@/registry/vibe-ui/button-01/button-01.tsx";',
    );
    expect(collection).toContain('staticData: { ariaLabel: "Button" }');
    expect(collection).toContain("satisfies RegistryCollectionItem[]");
    expect(collection).toContain('previewHref:"/preview/components/button/button-01"');
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
    expect(componentPreview).toContain("validateSearch: previewThemeSearchSchema");
    expect(componentPreview).toContain("const { theme } = Route.useSearch()");
    expect(componentPreview).toContain("theme={theme}");
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
    expect(collection.indexOf('name:"button-02"')).toBeLessThan(
      collection.indexOf('name:"button-01"'),
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

describe("writeRegistryOutputs", () => {
  it("replaces every builder-owned route directory", async () => {
    const fixture = await outputFixture();
    await Promise.all(
      ["components", "blocks", "pages"].map((segment) =>
        seed(path.join(fixture.paths.routesRootPath, segment, "old.tsx"), "handwritten\n"),
      ),
    );
    await seed(
      path.join(path.dirname(fixture.paths.routesRootPath), "preview/old.tsx"),
      "handwritten\n",
    );

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
    await expect(
      readFile(path.join(path.dirname(fixture.paths.routesRootPath), "preview/old.tsx"), "utf8"),
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

function registry(changes: Record<string, unknown> = {}) {
  return {
    name: "Vibe UI",
    homepage: "https://example.com",
    items: [registryItem()],
    ...changes,
  };
}
