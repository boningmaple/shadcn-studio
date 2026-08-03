import { InfoIcon, SendIcon, StarIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDRichTooltip,
  MDRichTooltipTrigger,
  MDTooltip,
  MDTooltipTrigger,
} from "@/ui/material-design/components/md-tooltip/md-tooltip";

export default function MDTooltipDemo() {
  return (
    <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-3">
      <MDTooltipTrigger>
        <MDButton variant="filled">
          <SendIcon />
          Send update
        </MDButton>
        <MDTooltip>Send now</MDTooltip>
      </MDTooltipTrigger>
      <MDTooltipTrigger>
        <MDIconButton aria-label="Star update" variant="outlined">
          <StarIcon />
        </MDIconButton>
        <MDTooltip placement="bottom">Star update</MDTooltip>
      </MDTooltipTrigger>
      <MDRichTooltipTrigger>
        <MDIconButton aria-label="Delivery details" variant="standard">
          <InfoIcon />
        </MDIconButton>
        <MDRichTooltip placement="bottom end" title="Delivery details">
          Updates go to everyone following this workspace and stay editable for
          five minutes after sending.
        </MDRichTooltip>
      </MDRichTooltipTrigger>
    </div>
  );
}
