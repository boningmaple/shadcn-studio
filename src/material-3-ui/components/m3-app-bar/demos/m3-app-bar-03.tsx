import {
  FilterIcon,
  Grid2X2Icon,
  MenuIcon,
  MoreVerticalIcon,
} from "lucide-react";

import {
  M3AppBar,
  M3AppBarActions,
  M3AppBarTitle,
} from "@/material-3-ui/components/m3-app-bar/m3-app-bar";
import {
  M3Chip,
  M3ChipGroup,
  M3ChipList,
} from "@/material-3-ui/components/m3-chips/m3-chips";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3AppBarDemo() {
  return (
    <M3AppBar
      aria-label="Projects app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      size="medium"
    >
      <M3IconButton aria-label="Open navigation" variant="standard">
        <MenuIcon />
      </M3IconButton>
      <M3AppBarTitle>Projects</M3AppBarTitle>
      <M3ChipGroup
        className="hidden md:block"
        defaultSelectedKeys={["active"]}
        selectionMode="single"
        variant="filter"
      >
        <M3ChipList aria-label="Project filter">
          <M3Chip id="active">Active</M3Chip>
          <M3Chip id="owned">Owned</M3Chip>
        </M3ChipList>
      </M3ChipGroup>
      <M3AppBarActions>
        <M3IconButton aria-label="Filter" variant="standard">
          <FilterIcon />
        </M3IconButton>
        <M3IconButton aria-label="Grid view" variant="standard">
          <Grid2X2Icon />
        </M3IconButton>
        <M3IconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </M3IconButton>
      </M3AppBarActions>
    </M3AppBar>
  );
}
