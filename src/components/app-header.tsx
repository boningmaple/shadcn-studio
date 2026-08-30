import { Link } from "@tanstack/react-router";

import { appQuickLinks } from "@/components/app-sidebar";
import { SearchDialogTrigger } from "@/features/search/components/search-dialog-trigger";
import { ThemeSwitchButton } from "@/features/theme-switch/components/theme-switch-button";
import { Route as blocksRoute } from "@/routes/_rootLayout.blocks.index";
import { Route as componentsRoute } from "@/routes/_rootLayout.components.index";
import { Route as homeRoute } from "@/routes/_rootLayout.index";
import { Route as pagesRoute } from "@/routes/_rootLayout.pages.index";

import { SidebarTrigger } from "./ui/sidebar";

const headerNavRoutes = [componentsRoute, blocksRoute, pagesRoute] as const;

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full h-(--header-height) border-b border-dashed backdrop-blur-sm flex items-center gap-4 px-4">
      <SidebarTrigger className="lg:hidden" size="icon" />

      <Link
        className="text-xl font-bold hover:underline"
        aria-label={homeRoute.options.staticData.ariaLabel}
        to={homeRoute.to}
        activeOptions={{ exact: true }}
      >
        VibeUI
      </Link>

      <nav aria-label="App primary navigation" className="hidden lg:flex items-center gap-8 mx-4">
        {headerNavRoutes.map((route) => (
          <Link
            key={route.id}
            className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground data-status:text-foreground data-status:underline data-status:underline-offset-3"
            to={route.to}
          >
            {route.options.staticData.ariaLabel}
          </Link>
        ))}
      </nav>

      <div className="flex-1" />

      <div aria-label="App header actions" className="flex items-center gap-4">
        <SearchDialogTrigger quickLinks={appQuickLinks} />
        <ThemeSwitchButton />
      </div>
    </header>
  );
}
