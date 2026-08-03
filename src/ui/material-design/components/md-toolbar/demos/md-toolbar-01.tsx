import {
  ArrowLeftIcon,
  BellIcon,
  MoreVerticalIcon,
  SearchIcon,
} from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import { MDTextField } from "@/ui/material-design/components/md-text-field/md-text-field";
import {
  MDToolbar,
  MDToolbarGroup,
  MDToolbarSpacer,
  MDToolbarTitle,
} from "@/ui/material-design/components/md-toolbar/md-toolbar";

export default function MDToolbarDemo() {
  return (
    <MDToolbar
      aria-label="Document toolbar"
      className="max-w-3xl overflow-hidden rounded-[20px] border border-[#cac4d0] dark:border-[#49454f]"
    >
      <MDToolbarGroup>
        <MDIconButton aria-label="Back" variant="standard">
          <ArrowLeftIcon />
        </MDIconButton>
        <MDToolbarTitle>Documents</MDToolbarTitle>
      </MDToolbarGroup>
      <MDToolbarSpacer />
      <MDTextField
        aria-label="Search documents"
        className="hidden w-64 md:grid"
        label="Search"
        variant="outlined"
      >
        <SearchIcon className="ms-4 size-5 text-[#49454f] dark:text-[#cac4d0]" />
      </MDTextField>
      <MDToolbarGroup>
        <MDIconButton aria-label="Notifications" variant="standard">
          <BellIcon />
        </MDIconButton>
        <MDIconButton aria-label="More actions" variant="standard">
          <MoreVerticalIcon />
        </MDIconButton>
      </MDToolbarGroup>
    </MDToolbar>
  );
}
