import {
  FileDownIcon,
  FileJsonIcon,
  FileTextIcon,
  MoreVerticalIcon,
  Share2Icon,
} from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";
import { Menu, MenuItem, MenuTrigger, Submenu } from "@/components/menu/menu";

export default function MenuDemo() {
  return (
    <MenuTrigger>
      <IconButton aria-label="Open document menu" variant="standard">
        <MoreVerticalIcon />
      </IconButton>
      <Menu>
        <MenuItem icon={<Share2Icon />}>Share</MenuItem>
        <Submenu>
          <MenuItem icon={<FileDownIcon />}>Export</MenuItem>
          <Menu placement="end top">
            <MenuItem icon={<FileTextIcon />}>PDF</MenuItem>
            <MenuItem icon={<FileJsonIcon />}>JSON</MenuItem>
          </Menu>
        </Submenu>
      </Menu>
    </MenuTrigger>
  );
}
