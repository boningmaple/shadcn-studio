import { BellIcon, InboxIcon, SearchIcon, SettingsIcon } from "lucide-react";

import { IconButton } from "@/components/icon-button/icon-button";
import { Tooltip, TooltipTrigger } from "@/components/tooltip/tooltip";

const actions = [
  { label: "Search", icon: SearchIcon, variant: "standard" },
  { label: "Notifications", icon: BellIcon, variant: "tonal" },
  { label: "Inbox", icon: InboxIcon, variant: "outlined" },
  { label: "Settings", icon: SettingsIcon, variant: "filled" },
] as const;

export default function TooltipDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      {actions.map((action) => (
        <TooltipTrigger key={action.label}>
          <IconButton aria-label={action.label} variant={action.variant}>
            <action.icon />
          </IconButton>
          <Tooltip>{action.label}</Tooltip>
        </TooltipTrigger>
      ))}
    </div>
  );
}
