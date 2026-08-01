import {
  ArrowLeftIcon,
  BellIcon,
  MoreVerticalIcon,
  SearchIcon,
} from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";
import { TextField } from "@/components/text-field/text-field";
import {
  Toolbar,
  ToolbarGroup,
  ToolbarSpacer,
  ToolbarTitle,
} from "@/components/toolbar/toolbar";

export default function ToolbarDemo() {
  return (
    <Toolbar
      aria-label="Document toolbar"
      className="max-w-3xl overflow-hidden rounded-[20px] border border-[#cac4d0] dark:border-[#49454f]"
    >
      <ToolbarGroup>
        <IconButton aria-label="Back" variant="standard">
          <ArrowLeftIcon />
        </IconButton>
        <ToolbarTitle>Documents</ToolbarTitle>
      </ToolbarGroup>
      <ToolbarSpacer />
      <TextField
        aria-label="Search documents"
        className="hidden w-64 md:grid"
        label="Search"
        variant="outlined"
      >
        <SearchIcon className="ms-4 size-5 text-[#49454f] dark:text-[#cac4d0]" />
      </TextField>
      <ToolbarGroup>
        <IconButton aria-label="Notifications" variant="standard">
          <BellIcon />
        </IconButton>
        <IconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </IconButton>
      </ToolbarGroup>
    </Toolbar>
  );
}
