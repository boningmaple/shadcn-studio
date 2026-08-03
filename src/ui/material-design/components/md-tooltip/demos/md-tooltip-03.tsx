import { HelpCircleIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDRichTooltip,
  MDRichTooltipTrigger,
} from "@/ui/material-design/components/md-tooltip/md-tooltip";

export default function MDTooltipDemo() {
  return (
    <MDRichTooltipTrigger>
      <MDIconButton aria-label="Explain smart routing" variant="tonal">
        <HelpCircleIcon />
      </MDIconButton>
      <MDRichTooltip
        actions={
          <MDButton size="xs" variant="text">
            Learn more
          </MDButton>
        }
        title="Smart routing"
      >
        Suggestions are ranked by availability, travel time, and the priority
        set on each destination.
      </MDRichTooltip>
    </MDRichTooltipTrigger>
  );
}
