import {
  FileDownIcon,
  FileJsonIcon,
  FileTextIcon,
  MoreVerticalIcon,
  Share2Icon,
} from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3Menu,
  M3MenuItem,
  M3MenuTrigger,
  M3Submenu,
} from "@/material-3-ui/components/m3-menu/m3-menu";

export default function M3MenuDemo() {
  return (
    <M3MenuTrigger>
      <M3IconButton aria-label="Open document menu" variant="standard">
        <MoreVerticalIcon />
      </M3IconButton>
      <M3Menu>
        <M3MenuItem icon={<Share2Icon />}>Share</M3MenuItem>
        <M3Submenu>
          <M3MenuItem icon={<FileDownIcon />}>Export</M3MenuItem>
          <M3Menu placement="end top">
            <M3MenuItem icon={<FileTextIcon />}>PDF</M3MenuItem>
            <M3MenuItem icon={<FileJsonIcon />}>JSON</M3MenuItem>
          </M3Menu>
        </M3Submenu>
      </M3Menu>
    </M3MenuTrigger>
  );
}
