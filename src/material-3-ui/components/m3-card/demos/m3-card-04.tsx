import { CheckCircle2Icon, MoreVerticalIcon } from "lucide-react";

import {
  M3Badge,
  M3BadgeAnchor,
} from "@/material-3-ui/components/m3-badge/m3-badge";
import {
  M3Card,
  M3CardActions,
  M3CardContent,
  M3CardHeader,
} from "@/material-3-ui/components/m3-card/m3-card";
import { M3Divider } from "@/material-3-ui/components/m3-divider/m3-divider";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";

const updates = ["Tokens synced", "Storybook reviewed", "Docs ready"];

export default function M3CardDemo() {
  return (
    <M3Card className="w-full max-w-md" variant="elevated">
      <M3CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <span className="text-base leading-6 font-medium">
              Release readiness
            </span>
            <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
              Design system checklist
            </span>
          </div>
          <M3BadgeAnchor>
            <M3IconButton
              aria-label="More actions"
              size="xs"
              variant="standard"
            >
              <MoreVerticalIcon />
            </M3IconButton>
            <M3Badge>3</M3Badge>
          </M3BadgeAnchor>
        </div>
      </M3CardHeader>
      <M3CardContent className="grid gap-3">
        {updates.map((update, index) => (
          <div className="grid gap-3" key={update}>
            <div className="flex items-center gap-3">
              <CheckCircle2Icon className="size-5 text-[#386a20] dark:text-[#b6f397]" />
              <span>{update}</span>
            </div>
            {index === updates.length - 1 ? null : <M3Divider inset="start" />}
          </div>
        ))}
      </M3CardContent>
      <M3CardActions>
        <span className="px-3 text-sm leading-8 font-medium text-[#6750a4] dark:text-[#d0bcff]">
          Ready
        </span>
      </M3CardActions>
    </M3Card>
  );
}
