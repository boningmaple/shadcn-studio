import {
  ArchiveIcon,
  BellIcon,
  DownloadIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3Menu,
  M3MenuItem,
  M3MenuSection,
  M3MenuSeparator,
  M3MenuTrigger,
} from "@/material-3-ui/components/m3-menu/m3-menu";

export default function M3MenuDemo() {
  return (
    <M3MenuTrigger>
      <M3IconButton aria-label="Open project actions" variant="outlined">
        <SettingsIcon />
      </M3IconButton>
      <M3Menu>
        <M3MenuSection title="Project">
          <M3MenuItem description="Save a local copy" icon={<DownloadIcon />}>
            Download
          </M3MenuItem>
          <M3MenuItem
            description="Move out of the active list"
            icon={<ArchiveIcon />}
          >
            Archive
          </M3MenuItem>
        </M3MenuSection>
        <M3MenuSeparator />
        <M3MenuSection title="Notifications">
          <M3MenuItem icon={<BellIcon />}>Mute thread</M3MenuItem>
          <M3MenuItem icon={<TrashIcon />} isDisabled>
            Delete
          </M3MenuItem>
        </M3MenuSection>
      </M3Menu>
    </M3MenuTrigger>
  );
}
