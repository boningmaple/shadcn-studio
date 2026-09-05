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
    <>
      <h1>{title}</h1>
      <p>{description}</p>

      <div className="not-prose grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((collection) => (
          <Link key={collection.href} to={collection.href}>
            <Card className="hover:bg-muted">
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
    </>
  );
}
