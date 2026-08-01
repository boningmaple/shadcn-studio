import {
  FilterIcon,
  Grid2X2Icon,
  MenuIcon,
  MoreVerticalIcon,
} from "lucide-react";

import {
  AppBar,
  AppBarActions,
  AppBarTitle,
} from "@/components/app-bar/app-bar";
import { Chip, ChipGroup, ChipList } from "@/components/chips/chips";
import { IconButton } from "@/components/icon-button/icon-button";

export default function AppBarDemo() {
  return (
    <AppBar
      aria-label="Projects app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
      size="medium"
    >
      <IconButton aria-label="Open navigation" variant="standard">
        <MenuIcon />
      </IconButton>
      <AppBarTitle>Projects</AppBarTitle>
      <ChipGroup
        className="hidden md:block"
        defaultSelectedKeys={["active"]}
        selectionMode="single"
        variant="filter"
      >
        <ChipList aria-label="Project filter">
          <Chip id="active">Active</Chip>
          <Chip id="owned">Owned</Chip>
        </ChipList>
      </ChipGroup>
      <AppBarActions>
        <IconButton aria-label="Filter" variant="standard">
          <FilterIcon />
        </IconButton>
        <IconButton aria-label="Grid view" variant="standard">
          <Grid2X2Icon />
        </IconButton>
        <IconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </IconButton>
      </AppBarActions>
    </AppBar>
  );
}
