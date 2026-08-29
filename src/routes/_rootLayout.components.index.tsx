import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRegistryItemGroupsByType } from "@/features/registry/api/registry.server-fns";

export const Route = createFileRoute("/_rootLayout/components/")({
  loader: async () => {
    const componentGroups = await getRegistryItemGroupsByType({
      data: { type: "registry:component" },
    });

    if (componentGroups.length === 0) throw notFound();
    return componentGroups;
  },
  component: ComponentsPage,
});

function ComponentsPage() {
  const componentGroups = Route.useLoaderData();

  return (
    <div className="mx-auto w-full space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Components</h1>
        <p className="max-w-2xl text-muted-foreground">
          Browse focused UI components grouped by category.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {componentGroups.map((group) => (
          <Link
            key={group.category}
            params={{ category: group.category }}
            to="/components/$category"
          >
            <Card className="h-full transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>{categoryTitle(group.category)}</CardTitle>
                <CardDescription>
                  {group.itemCount} {group.itemCount === 1 ? "item" : "items"}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

function categoryTitle(category: string): string {
  return category
    .split("-")
    .filter(Boolean)
    .map((part) => `${part[0]?.toUpperCase() ?? ""}${part.slice(1)}`)
    .join(" ");
}
