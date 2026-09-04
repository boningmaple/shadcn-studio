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
    <div className="w-full">
      <header className="prose dark:prose-invert">
        <h1>{title}</h1>
        <p>{description}</p>
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
