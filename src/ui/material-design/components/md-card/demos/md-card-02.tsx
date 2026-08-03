import { BookmarkIcon, HeadphonesIcon, PlayIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDCard,
  MDCardActions,
  MDCardContent,
  MDCardHeader,
} from "@/ui/material-design/components/md-card/md-card";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export default function MDCardDemo() {
  return (
    <MDCard className="w-full max-w-sm" variant="filled">
      <div className="h-36 bg-[linear-gradient(135deg,#006a6a_0%,#4fd8eb_52%,#ffb4ab_100%)]" />
      <MDCardHeader>
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
      </MDCardHeader>
      <MDCardContent>
        A compact card can combine media, supporting text, and a small action
        set around one subject.
      </MDCardContent>
      <MDCardActions>
        <MDIconButton aria-label="Save brief" size="xs" variant="standard">
          <BookmarkIcon />
        </MDIconButton>
        <MDButton size="xs" variant="text">
          Details
        </MDButton>
        <MDButton size="xs" variant="tonal">
          <PlayIcon />
          Play
        </MDButton>
      </MDCardActions>
    </MDCard>
  );
}
