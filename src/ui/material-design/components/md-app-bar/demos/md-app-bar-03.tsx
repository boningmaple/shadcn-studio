import {
  FilterIcon,
  Grid2X2Icon,
  MenuIcon,
  MoreVerticalIcon,
} from "lucide-react";

import {
  MDAppBar,
  MDAppBarActions,
  MDAppBarTitle,
} from "@/ui/material-design/components/md-app-bar/md-app-bar";
import {
  MDChip,
  MDChipGroup,
  MDChipList,
} from "@/ui/material-design/components/md-chips/md-chips";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDAppBarDemo() {
  return (
    <MDAppBar
      aria-label="Projects app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      size="medium"
    >
      <MDIconButton aria-label="Open navigation" variant="standard">
        <MenuIcon />
      </MDIconButton>
      <MDAppBarTitle>Projects</MDAppBarTitle>
      <MDChipGroup
        className="hidden md:block"
        defaultSelectedKeys={["active"]}
        selectionMode="single"
        variant="filter"
      >
        <MDChipList aria-label="Project filter">
          <MDChip id="active">Active</MDChip>
          <MDChip id="owned">Owned</MDChip>
        </MDChipList>
      </MDChipGroup>
      <MDAppBarActions>
        <MDIconButton aria-label="Filter" variant="standard">
          <FilterIcon />
        </MDIconButton>
        <MDIconButton aria-label="Grid view" variant="standard">
          <Grid2X2Icon />
        </MDIconButton>
        <MDIconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </MDIconButton>
      </MDAppBarActions>
    </MDAppBar>
  );
}
