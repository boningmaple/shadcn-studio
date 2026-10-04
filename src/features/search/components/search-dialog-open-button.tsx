import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Kbd, KbdGroup } from "@/components/ui/kbd";
import { isApplePlatform } from "@/features/search/lib/platform";

import { useSearchShortcut } from "../hooks/use-search-shortcut";

type SearchDialogOpenButtonProps = {
  onPress: () => void;
};

export function SearchDialogOpenButton(props: SearchDialogOpenButtonProps) {
  useSearchShortcut(props.onPress);

  return (
    <Button
      aria-label="Search"
      variant="outline"
      className="size-8 min-w-8 rounded-full gap-2 justify-start px-1.75 lg:w-full overflow-hidden transition-[width] duration-200 ease-linear motion-reduce:transition-none"
      onPress={props.onPress}
    >
      <SearchIcon />
      <span className="hidden min-w-0 flex-1 lg:flex items-center gap-2 group-data-[collapsible=icon]:opacity-0 transition-opacity duration-200 ease-linear overflow-hidden motion-reduce:transition-none">
        <span className="min-w-0 truncate">Search</span>
        <KbdGroup aria-hidden className="ml-auto shrink-0">
          <Kbd>{isApplePlatform() ? "⌘" : "Ctrl"}</Kbd>
          <Kbd>K</Kbd>
        </KbdGroup>
      </span>
    </Button>
  );
}
