import { CopyIcon, FilePenLineIcon, ScissorsIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3Menu,
  M3MenuItem,
  M3MenuTrigger,
} from "@/material-3-ui/components/m3-menu/m3-menu";

export default function M3MenuDemo() {
  return (
    <M3MenuTrigger>
      <M3Button variant="tonal">Edit</M3Button>
      <M3Menu>
        <M3MenuItem icon={<ScissorsIcon />} shortcut="⌘X">
          Cut
        </M3MenuItem>
        <M3MenuItem icon={<CopyIcon />} shortcut="⌘C">
          Copy
        </M3MenuItem>
        <M3MenuItem icon={<FilePenLineIcon />} shortcut="⌘V">
          Paste
        </M3MenuItem>
      </M3Menu>
    </M3MenuTrigger>
  );
}
