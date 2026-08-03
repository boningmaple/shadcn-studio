import { CheckCircle2Icon, MoreVerticalIcon } from "lucide-react";

import {
  MDBadge,
  MDBadgeAnchor,
} from "@/ui/material-design/components/md-badge/md-badge";
import {
  MDCard,
  MDCardActions,
  MDCardContent,
  MDCardHeader,
} from "@/ui/material-design/components/md-card/md-card";
import { MDDivider } from "@/ui/material-design/components/md-divider/md-divider";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

const updates = ["Tokens synced", "Storybook reviewed", "Docs ready"];

export default function MDCardDemo() {
  return (
    <MDCard className="w-full max-w-md" variant="elevated">
      <MDCardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="grid gap-1">
            <span className="text-base leading-6 font-medium">
              Release readiness
            </span>
            <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
              Design system checklist
            </span>
          </div>
          <MDBadgeAnchor>
            <MDIconButton
              aria-label="More actions"
              size="xs"
              variant="standard"
            >
              <MoreVerticalIcon />
            </MDIconButton>
            <MDBadge>3</MDBadge>
          </MDBadgeAnchor>
        </div>
      </MDCardHeader>
      <MDCardContent className="grid gap-3">
        {updates.map((update, index) => (
          <div className="grid gap-3" key={update}>
            <div className="flex items-center gap-3">
              <CheckCircle2Icon className="size-5 text-[#386a20] dark:text-[#b6f397]" />
              <span>{update}</span>
            </div>
            {index === updates.length - 1 ? null : <MDDivider inset="start" />}
          </div>
        ))}
      </MDCardContent>
      <MDCardActions>
        <span className="px-3 text-sm leading-8 font-medium text-[#6750a4] dark:text-[#d0bcff]">
          Ready
        </span>
      </MDCardActions>
    </MDCard>
  );
}
