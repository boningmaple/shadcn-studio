import { InfoIcon, SendIcon, StarIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3RichTooltip,
  M3RichTooltipTrigger,
  M3Tooltip,
  M3TooltipTrigger,
} from "@/material-3-ui/components/m3-tooltip/m3-tooltip";

export default function M3TooltipDemo() {
  return (
    <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-3">
      <M3TooltipTrigger>
        <M3Button variant="filled">
          <SendIcon />
          Send update
        </M3Button>
        <M3Tooltip>Send now</M3Tooltip>
      </M3TooltipTrigger>
      <M3TooltipTrigger>
        <M3IconButton aria-label="Star update" variant="outlined">
          <StarIcon />
        </M3IconButton>
        <M3Tooltip placement="bottom">Star update</M3Tooltip>
      </M3TooltipTrigger>
      <M3RichTooltipTrigger>
        <M3IconButton aria-label="Delivery details" variant="standard">
          <InfoIcon />
        </M3IconButton>
        <M3RichTooltip placement="bottom end" title="Delivery details">
          Updates go to everyone following this workspace and stay editable for
          five minutes after sending.
        </M3RichTooltip>
      </M3RichTooltipTrigger>
    </div>
  );
}
