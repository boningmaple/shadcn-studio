import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { AppHeader } from "@/features/app-shell/components/app-header";
import { AppSidebar } from "@/features/app-shell/components/app-sidebar";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";
import { themeHydrationScript } from "@/features/theme-switch/script/theme-hydration-script";

const TanStackDevtools = import.meta.env.DEV
  ? lazy(() =>
      import("@/features/app-shell/components/tanstack-devtools").then((module) => ({
        default: module.TanStackDevtools,
      })),
    )
  : null;

export const Route = createFileRoute("/_rootLayout")({
  head: () => ({
    scripts: [{ children: themeHydrationScript }],
  }),
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
            role="toolbar"
            className="hidden h-(--header-height) lg:flex items-center gap-4 px-4"
          >
            <SidebarTrigger variant="outline" size="icon" className="transition-none" />
          </div>
        )}
        <div className="flex-1 p-4 prose dark:prose-invert max-w-none">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  );
}
