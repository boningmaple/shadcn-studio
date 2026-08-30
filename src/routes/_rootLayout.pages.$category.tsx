import { createFileRoute, notFound } from "@tanstack/react-router";
import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getRegistryItemGroup } from "@/features/registry/api/registry.server-fns";
import { RegistryCodePanel } from "@/features/registry/components/registry-code-panel";
import { RegistryPreviewPage } from "@/features/registry/components/registry-preview-page";
import type { RegistryItemShowcase } from "@/features/registry/types/registry";

export const Route = createFileRoute("/_rootLayout/pages/$category")({
  staticData: { ariaLabel: "Page Collection" },
  loader: async ({ params }) => {
    const group = await getRegistryItemGroup({
      data: { category: params.category, type: "registry:page" },
    });

    if (group === null) throw notFound();
    return group;
  },
  component: PageCollectionPage,
});

function PageCollectionPage() {
  const group = Route.useLoaderData();

  return (
    <div className="mx-auto w-full max-w-7xl space-y-12 py-6">
      <header className="space-y-2">
        <p className="text-sm font-medium text-muted-foreground">Pages</p>
        <h1 className="text-3xl font-semibold tracking-tight">{categoryTitle(group.category)}</h1>
        <p className="max-w-2xl text-muted-foreground">
          Browse {categoryTitle(group.category).toLowerCase()} Registry items.
        </p>
      </header>

      <div className="space-y-16">
        {group.items.map((item) => (
          <RegistryPageShowcase item={item} key={item.name} />
        ))}
      </div>
    </div>
  );
}

function RegistryPageShowcase({ item }: { item: RegistryItemShowcase }) {
  const [codeEnabled, setCodeEnabled] = useState(false);

  return (
    <article className="scroll-mt-20 space-y-5" id={item.name}>
      <header className="space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{item.title}</h2>
        <p className="text-muted-foreground">{item.description}</p>
      </header>

      <Tabs
        defaultSelectedKey="preview"
        onSelectionChange={(key) => {
          if (key === "code") setCodeEnabled(true);
        }}
      >
        <TabsList aria-label={`${item.title} view`}>
          <TabsTrigger id="preview">Preview</TabsTrigger>
          <TabsTrigger id="code">Code</TabsTrigger>
        </TabsList>
        <TabsContent id="preview">
          <div className="min-h-136 overflow-hidden rounded-lg border bg-background">
            <RegistryPreviewPage embedded name={item.name} />
          </div>
        </TabsContent>
        <TabsContent id="code">
          {codeEnabled ? <RegistryCodePanel enabled name={item.name} /> : null}
        </TabsContent>
      </Tabs>
    </article>
  );
}

function categoryTitle(category: string): string {
  return category
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");
}
