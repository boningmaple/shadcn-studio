import { SlidersHorizontalIcon } from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";
import { SearchBar } from "@/components/search/search";

export default function SearchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <SearchBar
        aria-label="Search inventory"
        placeholder="Search inventory"
        trailing={
          <IconButton
            aria-label="Filter inventory"
            size="xs"
            slot={null}
            variant="standard"
          >
            <SlidersHorizontalIcon />
          </IconButton>
        }
      />
      <SearchBar
        aria-label="Search account"
        defaultValue="Invoices"
        placeholder="Search account"
        trailing={
          <span className="flex size-8 items-center justify-center rounded-full bg-[#eaddff] text-sm font-medium text-[#21005d] dark:bg-[#4f378b] dark:text-[#eaddff]">
            AL
          </span>
        }
      />
    </div>
  );
}
