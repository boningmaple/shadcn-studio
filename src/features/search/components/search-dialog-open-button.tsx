import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { isApplePlatform } from "@/features/search/lib/platform";

import { useSearchShortcut } from "../hooks/use-search-shortcut";

export function SearchDialogOpenButton({ onPress }: { onPress: () => void }) {
  useSearchShortcut(onPress);

  return (
    <>
      <Button
        aria-label="Search"
        size="icon"
        variant="outline"
        onPress={onPress}
        className="lg:hidden transition-none"
      >
        <SearchIcon />
      </Button>
      <Button
        onPress={onPress}
        variant="outline"
        className="hidden rounded-full text-muted-foreground lg:inline-flex transition-none"
      >
        <SearchIcon />
        <span className="pr-2">Search</span>
        <KbdGroup aria-hidden className="z-10">
          <Kbd>{isApplePlatform() ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
    </>
  );
}
