import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { getRegistryItemGroupsByType } from "@/features/registry/api/registry.server-fns";

export const Route = createFileRoute("/_rootLayout/blocks/")({
  staticData: { ariaLabel: "Blocks" },
  loader: async () => {
    const blockGroups = await getRegistryItemGroupsByType({
      data: { type: "registry:block" },
    });

    if (blockGroups.length === 0) throw notFound();
    return blockGroups;
  },
  component: BlocksPage,
});

function BlocksPage() {
  const blockGroups = Route.useLoaderData();

  return (
    <div className="mx-auto w-full space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">Blocks</h1>
        <p className="max-w-2xl text-muted-foreground">
          Browse complete interface sections and application patterns.
        </p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {blockGroups.map((group) => (
          <Link key={group.category} params={{ category: group.category }} to="/blocks/$category">
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
