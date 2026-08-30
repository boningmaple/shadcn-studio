import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { getRegistryNavigation } from "@/features/registry/api/registry.server-fns";
import { REGISTRY_CACHE_TIME_MS } from "@/features/registry/constants";
import type { RegistryNavigationResult } from "@/features/registry/types/registry";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";

export const Route = createFileRoute("/_rootLayout")({
  staticData: { ariaLabel: "" },
  loader: () => getRegistryNavigation(),
  component: RouteComponent,
  gcTime: REGISTRY_CACHE_TIME_MS,
  staleTime: REGISTRY_CACHE_TIME_MS,
});

function RouteComponent() {
  const hideDesktopSidebar = useMatches({
    select: (matches) => matches.some((match) => match.staticData.hideDesktopSidebar === true),
  });
  const navigation = Route.useLoaderData();

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
        <AppSidebar
          navigation={navigation}
          className="top-(--header-height) h-[calc(100svh-var(--header-height))]"
        />
      ) : null}
      <SidebarInset className="min-w-0">
        {hideDesktopSidebar ? null : (
          <div
            aria-label="Workspace controls"
            className="hidden h-(--header-height) shrink-0 items-center gap-2 border-b px-4 lg:flex"
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
