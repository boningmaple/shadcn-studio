import { ArrowLeftIcon, SlidersHorizontalIcon } from "lucide-react";

import { MDSearchAppBar } from "@/ui/material-design/components/md-app-bar/md-app-bar";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDAppBarDemo() {
  return (
    <MDSearchAppBar
      aria-label="Search app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      searchProps={{
        leading: (
          <MDIconButton aria-label="Back" size="xs" variant="standard">
            <ArrowLeftIcon />
          </MDIconButton>
        ),
        placeholder: "Search files",
        trailing: (
          <MDIconButton aria-label="Filter search" size="xs" variant="standard">
            <SlidersHorizontalIcon />
          </MDIconButton>
        ),
      }}
    />
  );
}
