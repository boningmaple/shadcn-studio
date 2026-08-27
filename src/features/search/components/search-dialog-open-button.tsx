import { SearchIcon } from "lucide-react";

import { isApplePlatform } from "@/features/search/lib/platform";
import { Button } from "@/features/ui-shadcn/react-aria/button";
import { Kbd, KbdGroup } from "@/features/ui-shadcn/react-aria/kbd";

import { useSearchShortcut } from "../hooks/use-search-shortcut";

export function SearchDialogOpenButton({ onPress }: { onPress: () => void }) {
  useSearchShortcut(onPress);

  return (
    <>
      <Button
        aria-label="Search"
        className="lg:hidden"
        onPress={onPress}
        size="icon-sm"
        variant="outline"
      >
        <SearchIcon />
      </Button>
      <Button
        className="hidden w-60 rounded-full text-muted-foreground lg:inline-flex"
        onPress={onPress}
        variant="outline"
      >
        <SearchIcon />
        <span className="flex-1 text-left">Search</span>
        <KbdGroup aria-hidden>
          <Kbd>{isApplePlatform() ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </Button>
    </>
  );
}
