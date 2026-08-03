import { BellIcon, SearchIcon, SettingsIcon } from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export default function M3IconButtonDemo() {
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <TooltipTrigger delay={300}>
        <M3IconButton aria-label="Search" variant="standard">
          <SearchIcon />
        </M3IconButton>
        <Tooltip>Search</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={300}>
        <M3IconButton aria-label="Notifications" variant="tonal">
          <BellIcon />
        </M3IconButton>
        <Tooltip>Notifications</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={300}>
        <M3IconButton aria-label="Settings" variant="outlined">
          <SettingsIcon />
        </M3IconButton>
        <Tooltip>Settings</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
