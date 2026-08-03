import {
  FileDownIcon,
  FileJsonIcon,
  FileTextIcon,
  MoreVerticalIcon,
  Share2Icon,
} from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDMenu,
  MDMenuItem,
  MDMenuTrigger,
  MDSubmenu,
} from "@/ui/material-design/components/md-menu/md-menu";

export default function MDMenuDemo() {
  return (
    <MDMenuTrigger>
      <MDIconButton aria-label="Open document menu" variant="standard">
        <MoreVerticalIcon />
      </MDIconButton>
      <MDMenu>
        <MDMenuItem icon={<Share2Icon />}>Share</MDMenuItem>
        <MDSubmenu>
          <MDMenuItem icon={<FileDownIcon />}>Export</MDMenuItem>
          <MDMenu placement="end top">
            <MDMenuItem icon={<FileTextIcon />}>PDF</MDMenuItem>
            <MDMenuItem icon={<FileJsonIcon />}>JSON</MDMenuItem>
          </MDMenu>
        </MDSubmenu>
      </MDMenu>
    </MDMenuTrigger>
  );
}
