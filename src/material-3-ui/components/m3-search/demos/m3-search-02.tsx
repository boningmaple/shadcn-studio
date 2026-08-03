import { SlidersHorizontalIcon } from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import { M3SearchBar } from "@/material-3-ui/components/m3-search/m3-search";

export default function M3SearchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <M3SearchBar
        aria-label="Search inventory"
        placeholder="Search inventory"
        trailing={
          <M3IconButton
            aria-label="Filter inventory"
            size="xs"
            slot={null}
            variant="standard"
          >
            <SlidersHorizontalIcon />
          </M3IconButton>
        }
      />
      <M3SearchBar
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
