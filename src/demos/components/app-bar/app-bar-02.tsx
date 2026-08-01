import { ArrowLeftIcon, MoreVerticalIcon, StarIcon } from "lucide-react";

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
      aria-label="Article app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
    >
      <IconButton aria-label="Back" variant="standard">
        <ArrowLeftIcon />
      </IconButton>
      <AppBarTitle className="text-center">Article</AppBarTitle>
      <ChipGroup className="hidden sm:block" variant="assist">
        <ChipList aria-label="Article status">
          <Chip id="draft">Draft</Chip>
        </ChipList>
      </ChipGroup>
      <AppBarActions>
        <IconButton aria-label="Favorite" variant="standard">
          <StarIcon />
        </IconButton>
        <IconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </IconButton>
      </AppBarActions>
    </AppBar>
  );
}
