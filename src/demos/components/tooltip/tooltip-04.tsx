import { InfoIcon, SendIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import { IconButton } from "@/components/icon-button/icon-button";
import {
  RichTooltip,
  RichTooltipTrigger,
  Tooltip,
  TooltipTrigger,
} from "@/components/tooltip/tooltip";

export default function TooltipDemo() {
  return (
    <div className="flex w-full max-w-xl flex-wrap items-center justify-center gap-3">
      <TooltipTrigger>
        <Button variant="filled">
          <SendIcon />
          Send update
        </Button>
        <Tooltip>Send now</Tooltip>
      </TooltipTrigger>
      <TooltipTrigger>
        <IconButton aria-label="Star update" variant="outlined">
          <StarIcon />
        </IconButton>
        <Tooltip placement="bottom">Star update</Tooltip>
      </TooltipTrigger>
      <RichTooltipTrigger>
        <IconButton aria-label="Delivery details" variant="standard">
          <InfoIcon />
        </IconButton>
        <RichTooltip placement="bottom end" title="Delivery details">
          Updates go to everyone following this workspace and stay editable for
          five minutes after sending.
        </RichTooltip>
      </RichTooltipTrigger>
    </div>
  );
}
