import { BellIcon, MenuIcon, MoreVerticalIcon, SearchIcon } from "lucide-react";

import {
  M3AppBar,
  M3AppBarActions,
  M3AppBarTitle,
} from "@/material-3-ui/components/m3-app-bar/m3-app-bar";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3AppBarDemo() {
  return (
    <M3AppBar
      aria-label="Inbox app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      elevation="raised"
    >
      <M3IconButton aria-label="Open navigation" variant="standard">
        <MenuIcon />
      </M3IconButton>
      <M3AppBarTitle>Inbox</M3AppBarTitle>
      <M3AppBarActions>
        <M3IconButton aria-label="Search" variant="standard">
          <SearchIcon />
        </M3IconButton>
        <M3IconButton aria-label="Notifications" variant="standard">
          <BellIcon />
        </M3IconButton>
        <M3IconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </M3IconButton>
      </M3AppBarActions>
    </M3AppBar>
  );
}
