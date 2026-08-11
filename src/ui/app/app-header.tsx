import * as React from "react";
import { SearchIcon } from "lucide-react";

import {
  SearchFieldTrigger,
  SearchPalette,
  searchTriggerLabel,
  useSearchShortcut,
} from "@/ui/app/search-palette";
import { ThemeSwitchButton } from "@/ui/app/theme";
import { Button } from "@/ui/shadcn/react-aria/button";

export function AppHeader() {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const openSearch = React.useCallback(() => setIsSearchOpen(true), []);

  useSearchShortcut(openSearch);

  return (
    <header className="sticky top-0 z-40 h-14 border-b bg-background/95 backdrop-blur">
      <div className="grid h-full grid-cols-[1fr_auto_1fr] items-center gap-3 px-4">
        <div className="flex items-center">
          <span className="truncate text-sm font-semibold">VibeUI</span>
        </div>

        <div>
          <SearchFieldTrigger className="hidden lg:flex" onPress={openSearch} />
        </div>

        <div
          aria-label="App header actions"
          className="flex items-center justify-end gap-2"
        >
          <Button
            aria-label={searchTriggerLabel}
            className="lg:hidden"
            onPress={openSearch}
            size="icon-sm"
            variant="outline"
          >
            <SearchIcon />
          </Button>
          <ThemeSwitchButton />
        </div>
      </div>

      <SearchPalette isOpen={isSearchOpen} onOpenChange={setIsSearchOpen} />
    </header>
  );
}
