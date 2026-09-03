import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";

import { AppHeader } from "@/components/app-header";
import { AppSidebar } from "@/components/app-sidebar";
import { SidebarInset, SidebarProvider, SidebarTrigger, useSidebar } from "@/components/ui/sidebar";
import { ThemeProvider } from "@/features/theme-switch/components/theme-provider";

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
            <SidebarTrigger size="icon" />
          </div>
        )}
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </SidebarInset>
    </div>
  );
}
