import { Link } from "@tanstack/react-router";

import { appQuickLinks } from "@/components/app-sidebar";
import { SearchDialogTrigger } from "@/features/search/components/search-dialog-trigger";
import { ThemeSwitchButton } from "@/features/theme-switch/components/theme-switch-button";

import { SidebarTrigger } from "./ui/sidebar";

const headerNavigationItems = [
  { label: "Components", to: "/components" },
  { label: "Blocks", to: "/blocks" },
  { label: "Pages", to: "/pages" },
] as const;

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 h-14 border-b bg-background/95 backdrop-blur">
      <div className="h-full flex items-center gap-3 px-4">
        <SidebarTrigger className="lg:hidden" />

        <Link
          activeOptions={{ exact: true }}
          className="truncate text-sm font-semibold transition-colors hover:text-foreground/80"
          to="/"
        >
          VibeUI
        </Link>

        <nav aria-label="Primary navigation" className="hidden lg:flex items-center gap-1 ">
          {headerNavigationItems.map((item) => (
            <Link
              activeProps={{ className: "bg-muted text-foreground" }}
              className="inline-flex h-8 items-center rounded-lg px-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              key={item.label}
              to={item.to}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex-1" />

        <div aria-label="App header actions" className="flex items-center gap-2">
          <SearchDialogTrigger quickLinks={appQuickLinks} />
          <ThemeSwitchButton />
        </div>
      </div>
    </header>
  );
}
