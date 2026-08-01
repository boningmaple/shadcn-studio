import { BellIcon, MenuIcon, MoreVerticalIcon, SearchIcon } from "lucide-react";

import {
  AppBar,
  AppBarActions,
  AppBarTitle,
} from "@/components/app-bar/app-bar";
import { IconButton } from "@/components/icon-button/icon-button";

export default function AppBarDemo() {
  return (
    <AppBar
      aria-label="Inbox app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      elevation="raised"
    >
      <IconButton aria-label="Open navigation" variant="standard">
        <MenuIcon />
      </IconButton>
      <AppBarTitle>Inbox</AppBarTitle>
      <AppBarActions>
        <IconButton aria-label="Search" variant="standard">
          <SearchIcon />
        </IconButton>
        <IconButton aria-label="Notifications" variant="standard">
          <BellIcon />
        </IconButton>
        <IconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </IconButton>
      </AppBarActions>
    </AppBar>
  );
}
