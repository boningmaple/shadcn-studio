import { createFileRoute } from "@tanstack/react-router";

import { searchMetadata } from "./-index.search";

export const Route = createFileRoute("/_rootLayout/")({
  staticData: { ariaLabel: "Home", hideDesktopSidebar: true, search: searchMetadata },
  component: HomePage,
});

function HomePage() {
  return (
    <div className="mx-auto max-w-3xl space-y-4 py-16 text-center">
      <p className="text-sm font-medium text-muted-foreground">VibeUI Registry</p>
      <h1 className="text-4xl font-semibold tracking-tight">Build from open, copy-ready UI</h1>
      <p className="text-lg text-muted-foreground">
        Browse components, blocks, and router-neutral pages built on shadcn UI.
      </p>
    </div>
  );
}
