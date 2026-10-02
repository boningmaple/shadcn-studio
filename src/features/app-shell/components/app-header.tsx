import { Link } from "@tanstack/react-router";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { AppBrandLink } from "@/features/app-shell/components/app-brand-link";
import { appQuickLinks } from "@/features/app-shell/components/app-sidebar";
import { SearchDialogTrigger } from "@/features/search/components/search-dialog-trigger";
import { ThemeSwitchButton } from "@/features/theme-switch/components/theme-switch-button";
import { Route as blocksRoute } from "@/routes/_rootLayout/blocks/index";
import { Route as chartsRoute } from "@/routes/_rootLayout/charts/index";
import { Route as componentsRoute } from "@/routes/_rootLayout/components/index";
import { Route as pagesRoute } from "@/routes/_rootLayout/pages/index";

const headerNavRoutes = [componentsRoute, blocksRoute, chartsRoute, pagesRoute] as const;

export function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full h-(--header-height) border-b border-dashed bg-background flex items-center gap-4 px-4">
      <SidebarTrigger variant="outline" size="icon" className="lg:hidden transition-none" />
      <AppBrandLink />
      <AppHeaderNavigation />
      <AppHeaderActions />
    </header>
  );
}

function AppHeaderNavigation() {
  return (
    <nav aria-label="Primary" className="hidden lg:flex items-center gap-8 mx-4">
      {headerNavRoutes.map((route) => (
        <Link
          key={route.id}
          to={route.to}
          className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground data-status:text-foreground data-status:underline data-status:underline-offset-3"
        >
          {route.options.staticData.ariaLabel}
        </Link>
      ))}
    </nav>
  );
}

function AppHeaderActions() {
  return (
    <div className="ml-auto flex items-center gap-2">
      <SearchDialogTrigger quickLinks={appQuickLinks} />
      <ThemeSwitchButton />
    </div>
  );
}
