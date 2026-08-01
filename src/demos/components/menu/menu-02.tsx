import {
  ArchiveIcon,
  BellIcon,
  DownloadIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";
import {
  Menu,
  MenuItem,
  MenuSection,
  MenuSeparator,
  MenuTrigger,
} from "@/components/menu/menu";

export default function MenuDemo() {
  return (
    <MenuTrigger>
      <IconButton aria-label="Open project actions" variant="outlined">
        <SettingsIcon />
      </IconButton>
      <Menu>
        <MenuSection title="Project">
          <MenuItem description="Save a local copy" icon={<DownloadIcon />}>
            Download
          </MenuItem>
          <MenuItem
            description="Move out of the active list"
            icon={<ArchiveIcon />}
          >
            Archive
          </MenuItem>
        </MenuSection>
        <MenuSeparator />
        <MenuSection title="Notifications">
          <MenuItem icon={<BellIcon />}>Mute thread</MenuItem>
          <MenuItem icon={<TrashIcon />} isDisabled>
            Delete
          </MenuItem>
        </MenuSection>
      </Menu>
    </MenuTrigger>
  );
}
