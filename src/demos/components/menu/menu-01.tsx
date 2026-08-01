import { CopyIcon, FilePenLineIcon, ScissorsIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import { Menu, MenuItem, MenuTrigger } from "@/components/menu/menu";

export default function MenuDemo() {
  return (
    <MenuTrigger>
      <Button variant="tonal">Edit</Button>
      <Menu>
        <MenuItem icon={<ScissorsIcon />} shortcut="⌘X">
          Cut
        </MenuItem>
        <MenuItem icon={<CopyIcon />} shortcut="⌘C">
          Copy
        </MenuItem>
        <MenuItem icon={<FilePenLineIcon />} shortcut="⌘V">
          Paste
        </MenuItem>
      </Menu>
    </MenuTrigger>
  );
}
