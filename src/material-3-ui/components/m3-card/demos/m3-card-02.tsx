import { BookmarkIcon, HeadphonesIcon, PlayIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3Card,
  M3CardActions,
  M3CardContent,
  M3CardHeader,
} from "@/material-3-ui/components/m3-card/m3-card";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

export default function M3CardDemo() {
  return (
    <M3Card className="w-full max-w-sm" variant="filled">
      <div className="h-36 bg-[linear-gradient(135deg,#006a6a_0%,#4fd8eb_52%,#ffb4ab_100%)]" />
      <M3CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <span className="text-base leading-6 font-medium">
              Daily design brief
            </span>
            <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
              18 minute listen
            </span>
          </div>
          <HeadphonesIcon className="size-6 shrink-0 text-[#6750a4] dark:text-[#d0bcff]" />
        </div>
      </M3CardHeader>
      <M3CardContent>
        A compact card can combine media, supporting text, and a small action
        set around one subject.
      </M3CardContent>
      <M3CardActions>
        <M3IconButton aria-label="Save brief" size="xs" variant="standard">
          <BookmarkIcon />
        </M3IconButton>
        <M3Button size="xs" variant="text">
          Details
        </M3Button>
        <M3Button size="xs" variant="tonal">
          <PlayIcon />
          Play
        </M3Button>
      </M3CardActions>
    </M3Card>
  );
}
