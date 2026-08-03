import { SlidersHorizontalIcon } from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import { MDSearchBar } from "@/ui/material-design/components/md-search/md-search";

export default function MDSearchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <MDSearchBar
        aria-label="Search inventory"
        placeholder="Search inventory"
        trailing={
          <MDIconButton
            aria-label="Filter inventory"
            size="xs"
            slot={null}
            variant="standard"
          >
            <SlidersHorizontalIcon />
          </MDIconButton>
        }
      />
      <MDSearchBar
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
