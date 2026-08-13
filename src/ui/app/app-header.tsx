import { SearchTrigger } from "@/ui/app/search-palette";
import { ThemeSwitchButton } from "@/ui/app/theme";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-40 h-14 border-b bg-background/95 backdrop-blur">
      <div className="h-full flex items-center justify-between gap-3 px-4">
        <div className="flex items-center">
          <span className="truncate text-sm font-semibold">VibeUI</span>
        </div>

        <div
          aria-label="App header actions"
          className="flex items-center gap-2"
        >
          <SearchTrigger />
          <ThemeSwitchButton />
        </div>
      </div>
    </header>
  );
}
