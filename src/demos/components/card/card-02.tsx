import { BookmarkIcon, HeadphonesIcon, PlayIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@/components/card/card";
import { IconButton } from "@/components/icon-button/icon-button";

export default function CardDemo() {
  return (
    <Card className="w-full max-w-sm" variant="filled">
      <div className="h-36 bg-[linear-gradient(135deg,#006a6a_0%,#4fd8eb_52%,#ffb4ab_100%)]" />
      <CardHeader>
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
      </CardHeader>
      <CardContent>
        A compact card can combine media, supporting text, and a small action
        set around one subject.
      </CardContent>
      <CardActions>
        <IconButton aria-label="Save brief" size="xs" variant="standard">
          <BookmarkIcon />
        </IconButton>
        <Button size="xs" variant="text">
          Details
        </Button>
        <Button size="xs" variant="tonal">
          <PlayIcon />
          Play
        </Button>
      </CardActions>
    </Card>
  );
}
