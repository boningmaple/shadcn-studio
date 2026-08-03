import { ArrowLeftIcon, MoreVerticalIcon, StarIcon } from "lucide-react";

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
      aria-label="Article app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
    >
      <M3IconButton aria-label="Back" variant="standard">
        <ArrowLeftIcon />
      </M3IconButton>
      <M3AppBarTitle className="text-center">Article</M3AppBarTitle>
      <M3ChipGroup className="hidden sm:block" variant="assist">
        <M3ChipList aria-label="Article status">
          <M3Chip id="draft">Draft</M3Chip>
        </M3ChipList>
      </M3ChipGroup>
      <M3AppBarActions>
        <M3IconButton aria-label="Favorite" variant="standard">
          <StarIcon />
        </M3IconButton>
        <M3IconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </M3IconButton>
      </M3AppBarActions>
    </M3AppBar>
  );
}
