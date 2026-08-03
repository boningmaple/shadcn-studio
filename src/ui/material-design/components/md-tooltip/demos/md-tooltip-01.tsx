import { BellIcon, InboxIcon, SearchIcon, SettingsIcon } from "lucide-react";

import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDTooltip,
  MDTooltipTrigger,
} from "@/ui/material-design/components/md-tooltip/md-tooltip";

const actions = [
  { label: "Search", icon: SearchIcon, variant: "standard" },
  { label: "Notifications", icon: BellIcon, variant: "tonal" },
  { label: "Inbox", icon: InboxIcon, variant: "outlined" },
  { label: "Settings", icon: SettingsIcon, variant: "filled" },
] as const;

export default function MDTooltipDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {actions.map((action) => (
        <MDTooltipTrigger key={action.label}>
          <MDIconButton aria-label={action.label} variant={action.variant}>
            <action.icon />
          </MDIconButton>
          <MDTooltip>{action.label}</MDTooltip>
        </MDTooltipTrigger>
      ))}
    </div>
  );
}
