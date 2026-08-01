import { CheckCircle2Icon, MoreVerticalIcon } from "lucide-react";

import { Badge, BadgeAnchor } from "@/components/badge/badge";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
} from "@/components/card/card";
import { Divider } from "@/components/divider/divider";
import { IconButton } from "@/components/icon-button/icon-button";

const updates = ["Tokens synced", "Storybook reviewed", "Docs ready"];

export default function CardDemo() {
  return (
    <Card className="w-full max-w-md" variant="elevated">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <span className="text-base leading-6 font-medium">
              Release readiness
            </span>
            <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
              Design system checklist
            </span>
          </div>
          <BadgeAnchor>
            <IconButton aria-label="More actions" size="xs" variant="standard">
              <MoreVerticalIcon />
            </IconButton>
            <Badge>3</Badge>
          </BadgeAnchor>
        </div>
      </CardHeader>
      <CardContent className="grid gap-3">
        {updates.map((update, index) => (
          <div className="grid gap-3" key={update}>
            <div className="flex items-center gap-3">
              <CheckCircle2Icon className="size-5 text-[#386a20] dark:text-[#b6f397]" />
              <span>{update}</span>
            </div>
            {index === updates.length - 1 ? null : <Divider inset="start" />}
          </div>
        ))}
      </CardContent>
      <CardActions>
        <span className="px-3 text-sm leading-8 font-medium text-[#6750a4] dark:text-[#d0bcff]">
          Ready
        </span>
      </CardActions>
    </Card>
  );
}
