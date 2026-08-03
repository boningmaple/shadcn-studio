import { BellIcon, SearchIcon, SettingsIcon } from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import { Tooltip, TooltipTrigger } from "@/ui/shadcn/react-aria/tooltip";

export default function MDIconButtonDemo() {
  return (
    <div className="flex w-full items-center justify-center gap-4">
      <TooltipTrigger delay={300}>
        <MDIconButton aria-label="Search" variant="standard">
          <SearchIcon />
        </MDIconButton>
        <Tooltip>Search</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={300}>
        <MDIconButton aria-label="Notifications" variant="tonal">
          <BellIcon />
        </MDIconButton>
        <Tooltip>Notifications</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger delay={300}>
        <MDIconButton aria-label="Settings" variant="outlined">
          <SettingsIcon />
        </MDIconButton>
        <Tooltip>Settings</Tooltip>
      </TooltipTrigger>
    </div>
  );
}
