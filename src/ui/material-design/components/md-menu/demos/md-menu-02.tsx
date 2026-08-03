import {
  ArchiveIcon,
  BellIcon,
  DownloadIcon,
  SettingsIcon,
  TrashIcon,
} from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDMenu,
  MDMenuItem,
  MDMenuSection,
  MDMenuSeparator,
  MDMenuTrigger,
} from "@/ui/material-design/components/md-menu/md-menu";

export default function MDMenuDemo() {
  return (
    <MDMenuTrigger>
      <MDIconButton aria-label="Open project actions" variant="outlined">
        <SettingsIcon />
      </MDIconButton>
      <MDMenu>
        <MDMenuSection title="Project">
          <MDMenuItem description="Save a local copy" icon={<DownloadIcon />}>
            Download
          </MDMenuItem>
          <MDMenuItem
            description="Move out of the active list"
            icon={<ArchiveIcon />}
          >
            Archive
          </MDMenuItem>
        </MDMenuSection>
        <MDMenuSeparator />
        <MDMenuSection title="Notifications">
          <MDMenuItem icon={<BellIcon />}>Mute thread</MDMenuItem>
          <MDMenuItem icon={<TrashIcon />} isDisabled>
            Delete
          </MDMenuItem>
        </MDMenuSection>
      </MDMenu>
    </MDMenuTrigger>
  );
}
