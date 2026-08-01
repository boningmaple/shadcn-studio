import { BellIcon, SearchIcon, SettingsIcon } from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";
import { Tooltip, TooltipTrigger } from "@/components/ui/tooltip";

export default function IconButtonDemo() {
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <TooltipTrigger delay={300}>
        <IconButton aria-label="Search" variant="standard">
          <SearchIcon />
        </IconButton>
        <Tooltip>Search</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={300}>
        <IconButton aria-label="Notifications" variant="tonal">
          <BellIcon />
        </IconButton>
        <Tooltip>Notifications</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={300}>
        <IconButton aria-label="Settings" variant="outlined">
          <SettingsIcon />
        </IconButton>
        <Tooltip>Settings</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
