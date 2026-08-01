import { ArrowLeftIcon, SlidersHorizontalIcon } from "lucide-react";

import { SearchAppBar } from "@/components/app-bar/app-bar";
import { IconButton } from "@/components/icon-button/icon-button";

export default function AppBarDemo() {
  return (
    <SearchAppBar
      aria-label="Search app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      searchProps={{
        leading: (
          <IconButton aria-label="Back" size="xs" variant="standard">
            <ArrowLeftIcon />
          </IconButton>
        ),
        placeholder: "Search files",
        trailing: (
          <IconButton aria-label="Filter search" size="xs" variant="standard">
            <SlidersHorizontalIcon />
          </IconButton>
        ),
      }}
    />
  );
}
