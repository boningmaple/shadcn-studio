import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";

const TanStackDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@/components/tanstack-devtools").then((module) => ({
        default: module.TanStackDevtools,
      })),
    )
  : null;

export const Route = createFileRoute("/_rootLayout")({
  staticData: { ariaLabel: "" },
  component: RouteComponent,
});

function RouteComponent() {
  const hideDesktopSidebar = useMatches({
    select: (matches) => matches.some((match) => match.staticData.hideDesktopSidebar === true),
  });

  return (
    <ThemeProvider>
      <SidebarProvider className="flex-col">
        <AppHeader />
        <RootLayoutContent hideDesktopSidebar={hideDesktopSidebar} />
      </SidebarProvider>
      {TanStackDevtools ? (
        <Suspense fallback={null}>
          <TanStackDevtools />
        </Suspense>
      ) : null}
    </ThemeProvider>
  );
}

function RootLayoutContent({ hideDesktopSidebar }: { hideDesktopSidebar: boolean }) {
  const { isMobile } = useSidebar();
  const showSidebar = isMobile || !hideDesktopSidebar;

  return (
    <div className="flex flex-1">
      {showSidebar ? (
        <AppSidebar className="top-(--header-height) h-[calc(100svh-var(--header-height))]" />
      ) : null}
      <SidebarInset className="min-w-0">
        {hideDesktopSidebar ? null : (
          <div
            aria-label="Workspace controls"
            className="hidden h-(--header-height) lg:flex items-center gap-4 px-4"
            role="toolbar"
          >
            <SidebarTrigger size="icon" variant="outline" className="transition-none" />
          </div>
        )}
        <div className="flex-1 p-4 prose dark:prose-invert max-w-none">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  );
}
