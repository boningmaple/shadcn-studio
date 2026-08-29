import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { getRegistryNavigation } from "@/features/registry/api/registry.server-fns";
import type { RegistryNavigationResult } from "@/features/registry/types/registry";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";

declare module "@tanstack/react-router" {
  interface StaticDataRouteOption {
    hideDesktopSidebar?: boolean;
  }
}

export const Route = createFileRoute("/_rootLayout")({
  loader: () => getRegistryNavigation(),
  component: RouteComponent,
});

function RouteComponent() {
  const navigation = Route.useLoaderData();
  const hideDesktopSidebar = useMatches({
    select: (matches) => matches.some((match) => match.staticData.hideDesktopSidebar === true),
  });

  return (
    <ThemeProvider>
      <SidebarProvider className="flex-col">
        <AppHeader />
        <RootLayoutContent hideDesktopSidebar={hideDesktopSidebar} navigation={navigation} />
      </SidebarProvider>
    </ThemeProvider>
  );
}

function RootLayoutContent({
  hideDesktopSidebar,
  navigation,
}: {
  hideDesktopSidebar: boolean;
  navigation: RegistryNavigationResult;
}) {
  const { isMobile } = useSidebar();
  const showSidebar = isMobile || !hideDesktopSidebar;

  return (
    <div className="flex flex-1">
      {showSidebar ? (
        <AppSidebar navigation={navigation} className="top-14 h-[calc(100svh-56px)]" />
      ) : null}
      <SidebarInset className="min-w-0">
        {hideDesktopSidebar ? null : (
          <div
            aria-label="Workspace controls"
            className="hidden h-14 shrink-0 items-center gap-2 border-b px-4 lg:flex"
            role="toolbar"
          >
            <SidebarTrigger />
          </div>
        )}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  );
}
