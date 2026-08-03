import { ArrowLeftIcon, SlidersHorizontalIcon } from "lucide-react";

import { M3SearchAppBar } from "@/material-3-ui/components/m3-app-bar/m3-app-bar";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3AppBarDemo() {
  return (
    <M3SearchAppBar
      aria-label="Search app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      searchProps={{
        leading: (
          <M3IconButton aria-label="Back" size="xs" variant="standard">
            <ArrowLeftIcon />
          </M3IconButton>
        ),
        placeholder: "Search files",
        trailing: (
          <M3IconButton aria-label="Filter search" size="xs" variant="standard">
            <SlidersHorizontalIcon />
          </M3IconButton>
        ),
      }}
    />
  );
}
