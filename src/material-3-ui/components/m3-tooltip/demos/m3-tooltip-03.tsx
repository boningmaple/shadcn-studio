import { HelpCircleIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3RichTooltip,
  M3RichTooltipTrigger,
} from "@/material-3-ui/components/m3-tooltip/m3-tooltip";

export default function M3TooltipDemo() {
  return (
    <M3RichTooltipTrigger>
      <M3IconButton aria-label="Explain smart routing" variant="tonal">
        <HelpCircleIcon />
      </M3IconButton>
      <M3RichTooltip
        actions={
          <M3Button size="xs" variant="text">
            Learn more
          </M3Button>
        }
        title="Smart routing"
      >
        Suggestions are ranked by availability, travel time, and the priority
        set on each destination.
      </M3RichTooltip>
    </M3RichTooltipTrigger>
  );
}
