import * as React from "react";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

import { findComponent } from "@/registry";
import {
  getDemoModuleLoader,
  type DemoPreviewTheme,
} from "@/ui/app/demo-preview";
import { cn } from "@/lib/utils";

const demoPreviewSearchSchema = z.object({
  theme: z.enum(["light", "dark"]).catch("light"),
});

export const Route = createFileRoute(
  "/material-design/components/$slug/$demoId",
)({
  component: StandaloneDemoPreviewPage,
  head: () => ({
    meta: [
      {
        title: "Demo Preview | VibeUI",
      },
    ],
  }),
  validateSearch: (search) => demoPreviewSearchSchema.parse(search),
});

function StandaloneDemoPreviewPage() {
  const { demoId, slug } = Route.useParams();
  const { theme } = Route.useSearch();
  const component = findComponent(slug);
  const demo = component?.demos.find((candidate) => candidate.id === demoId);
  const loadDemo =
    component === undefined || demo === undefined
      ? undefined
      : getDemoModuleLoader(component, demo);
  const Preview = React.useMemo(
    () => (loadDemo === undefined ? undefined : React.lazy(loadDemo)),
    [loadDemo],
  );

  if (component === undefined || demo === undefined || Preview === undefined) {
    return (
      <StandaloneDemoShell theme={theme}>
        <p className="text-sm text-muted-foreground" role="alert">
          Demo not found.
        </p>
      </StandaloneDemoShell>
    );
  }

  return (
    <StandaloneDemoShell theme={theme}>
      <React.Suspense
        fallback={
          <div className="text-sm text-muted-foreground" role="status">
            Loading preview
          </div>
        }
      >
        <main
          aria-label={`${demo.name} fullscreen preview`}
          className="flex min-h-svh w-full items-center justify-center p-4 sm:p-8"
        >
          <Preview />
        </main>
      </React.Suspense>
    </StandaloneDemoShell>
  );
}

function StandaloneDemoShell({
  children,
  theme,
}: {
  children: React.ReactNode;
  theme: DemoPreviewTheme;
}) {
  return (
    <div
      className={cn(
        "fixed inset-0 z-50 overflow-auto bg-background text-foreground",
        theme === "dark" ? "dark" : "light",
      )}
      style={{ colorScheme: theme }}
    >
      {children}
    </div>
  );
}
