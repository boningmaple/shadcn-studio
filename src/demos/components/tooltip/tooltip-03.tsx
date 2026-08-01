import { HelpCircleIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import { IconButton } from "@/components/icon-button/icon-button";
import { RichTooltip, RichTooltipTrigger } from "@/components/tooltip/tooltip";

export default function TooltipDemo() {
  return (
    <RichTooltipTrigger>
      <IconButton aria-label="Explain smart routing" variant="tonal">
        <HelpCircleIcon />
      </IconButton>
      <RichTooltip
        actions={
          <Button size="xs" variant="text">
            Learn more
          </Button>
        }
        title="Smart routing"
      >
        Suggestions are ranked by availability, travel time, and the priority
        set on each destination.
      </RichTooltip>
    </RichTooltipTrigger>
  );
}
