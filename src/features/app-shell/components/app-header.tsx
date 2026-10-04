import { Link } from "@tanstack/react-router";

import { AppBrandLink } from "@/features/app-shell/components/app-brand-link";
import { appHeaderNavLinks, appQuickLinks } from "@/features/registry/data/registry-data";
import { SearchDialogTrigger } from "@/features/search/components/search-dialog-trigger";
import { ThemeSwitchButton } from "@/features/theme-switch/components/theme-switch-button";

import AppSidebarTrigger from "./app-sidebar-trigger";

type AppHeaderProps = {
  showSidebar: boolean;
};

export function AppHeader(props: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full h-(--header-height) border-b border-dashed bg-background flex items-center gap-4 px-4">
      {props.showSidebar && <AppSidebarTrigger />}
      <AppBrandLink />
      {!props.showSidebar && <AppHeaderNavigation />}
      <AppHeaderActions />
    </header>
  );
}

function AppHeaderNavigation() {
  return (
    <nav aria-label="Primary" className="hidden lg:flex items-center gap-8 mx-4">
      {appHeaderNavLinks.map((link) => (
        <Link
          key={link.to}
          to={link.to}
          className="text-base font-medium text-muted-foreground transition-colors hover:text-foreground data-status:text-foreground data-status:underline data-status:underline-offset-3"
        >
          {link.label}
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
