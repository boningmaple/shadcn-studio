import {
  ArrowLeftIcon,
  BellIcon,
  MoreVerticalIcon,
  SearchIcon,
} from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import { M3TextField } from "@/material-3-ui/components/m3-text-field/m3-text-field";
import {
  M3Toolbar,
  M3ToolbarGroup,
  M3ToolbarSpacer,
  M3ToolbarTitle,
} from "@/material-3-ui/components/m3-toolbar/m3-toolbar";

export default function M3ToolbarDemo() {
  return (
    <M3Toolbar
      aria-label="Document toolbar"
      className="max-w-3xl overflow-hidden rounded-[20px] border border-[#cac4d0] dark:border-[#49454f]"
    >
      <M3ToolbarGroup>
        <M3IconButton aria-label="Back" variant="standard">
          <ArrowLeftIcon />
        </M3IconButton>
        <M3ToolbarTitle>Documents</M3ToolbarTitle>
      </M3ToolbarGroup>
      <M3ToolbarSpacer />
      <M3TextField
        aria-label="Search documents"
        className="hidden w-64 md:grid"
        label="Search"
        variant="outlined"
      >
        <SearchIcon className="ms-4 size-5 text-[#49454f] dark:text-[#cac4d0]" />
      </M3TextField>
      <M3ToolbarGroup>
        <M3IconButton aria-label="Notifications" variant="standard">
          <BellIcon />
        </M3IconButton>
        <M3IconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </M3IconButton>
      </M3ToolbarGroup>
    </M3Toolbar>
  );
}
