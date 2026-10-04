import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { lazy, Suspense } from "react";

import { SidebarProvider, useSidebar } from "@/components/ui/sidebar";
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
  return (
    <ThemeProvider>
      <SidebarProvider>
        <RootLayout />
      </SidebarProvider>
      {TanStackDevtools ? (
        <Suspense fallback={null}>
          <TanStackDevtools />
        </Suspense>
      ) : null}
    </ThemeProvider>
  );
}

function RootLayout() {
  const { isMobile } = useSidebar();
  const hideDesktopSidebar = useMatches({
    select: (matches) => matches.some((match) => match.staticData.hideDesktopSidebar === true),
  });
  const showSidebar = isMobile || !hideDesktopSidebar;

  return (
    <>
      {showSidebar ? <AppSidebar /> : null}
      <div className="relative flex min-w-0 flex-1 flex-col bg-background">
        {isMobile || hideDesktopSidebar ? <AppHeader showSidebar={showSidebar} /> : null}
        <main className="flex-1 p-4 prose dark:prose-invert max-w-none">
          <Outlet />
        </main>
      </div>
    </>
  );
}
