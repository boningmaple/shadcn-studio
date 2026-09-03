import { Link } from "@tanstack/react-router";

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export type RegistrySectionCollection = {
  href: string;
  itemCount: number;
  title: string;
};

export function RegistrySectionPage({
  collections,
  description,
  title,
}: {
  collections: RegistrySectionCollection[];
  description: string;
  title: string;
}) {
  return (
    <div className="w-full space-y-8">
      <header className="space-y-2">
        <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
        <p className="max-w-2xl text-muted-foreground">{description}</p>
      </header>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {collections.map((collection) => (
          <Link key={collection.href} to={collection.href}>
            <Card className="h-full transition-colors hover:bg-muted/40">
              <CardHeader>
                <CardTitle>{collection.title}</CardTitle>
                <CardDescription>
                  {collection.itemCount} {collection.itemCount === 1 ? "item" : "items"}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
