import { ArrowLeftIcon, MoreVerticalIcon, StarIcon } from "lucide-react";

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
      aria-label="Article app bar"
      className="max-w-3xl overflow-hidden rounded-t-[20px] border border-[#cac4d0] dark:border-[#49454f]"
    >
      <MDIconButton aria-label="Back" variant="standard">
        <ArrowLeftIcon />
      </MDIconButton>
      <MDAppBarTitle className="text-center">Article</MDAppBarTitle>
      <MDChipGroup className="hidden sm:block" variant="assist">
        <MDChipList aria-label="Article status">
          <MDChip id="draft">Draft</MDChip>
        </MDChipList>
      </MDChipGroup>
      <MDAppBarActions>
        <MDIconButton aria-label="Favorite" variant="standard">
          <StarIcon />
        </MDIconButton>
        <MDIconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </MDIconButton>
      </MDAppBarActions>
    </MDAppBar>
  );
}
