import { BellIcon, InboxIcon, SearchIcon, SettingsIcon } from "lucide-react";

import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3Tooltip,
  M3TooltipTrigger,
} from "@/material-3-ui/components/m3-tooltip/m3-tooltip";

const actions = [
  { label: "Search", icon: SearchIcon, variant: "standard" },
  { label: "Notifications", icon: BellIcon, variant: "tonal" },
  { label: "Inbox", icon: InboxIcon, variant: "outlined" },
  { label: "Settings", icon: SettingsIcon, variant: "filled" },
] as const;

export default function M3TooltipDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {actions.map((action) => (
        <M3TooltipTrigger key={action.label}>
          <M3IconButton aria-label={action.label} variant={action.variant}>
            <action.icon />
          </M3IconButton>
          <M3Tooltip>{action.label}</M3Tooltip>
        </M3TooltipTrigger>
      ))}
    </div>
  );
}
