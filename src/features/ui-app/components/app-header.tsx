import { SearchDialogTrigger } from "@/features/search/components/search-dialog-trigger";
import { ThemeSwitchButton } from "@/features/theme-switch/components/theme-switch-button";
import { appQuickLinks } from "@/features/ui-app/data/app-sidebar-data";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 h-14 border-b bg-background/95 backdrop-blur">
      <div className="h-full flex items-center justify-between gap-3 px-4">
        <div className="flex items-center">
          <span className="truncate text-sm font-semibold">VibeUI</span>
        </div>

        <div aria-label="App header actions" className="flex items-center gap-2">
          <SearchDialogTrigger quickLinks={appQuickLinks} />
          <ThemeSwitchButton />
        </div>
      </div>
    </header>
  );
}
