import { BellIcon, MenuIcon, MoreVerticalIcon, SearchIcon } from "lucide-react";

import {
  MDAppBar,
  MDAppBarActions,
  MDAppBarTitle,
} from "@/ui/material-design/components/md-app-bar/md-app-bar";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDAppBarDemo() {
  return (
    <MDAppBar
      aria-label="Inbox app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      elevation="raised"
    >
      <MDIconButton aria-label="Open navigation" variant="standard">
        <MenuIcon />
      </MDIconButton>
      <MDAppBarTitle>Inbox</MDAppBarTitle>
      <MDAppBarActions>
        <MDIconButton aria-label="Search" variant="standard">
          <SearchIcon />
        </MDIconButton>
        <MDIconButton aria-label="Notifications" variant="standard">
          <BellIcon />
        </MDIconButton>
        <MDIconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </MDIconButton>
      </MDAppBarActions>
    </MDAppBar>
  );
}
