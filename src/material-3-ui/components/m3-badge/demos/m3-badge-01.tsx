import {
  BellIcon,
  CircleAlertIcon,
  MailIcon,
  MessageSquareIcon,
  UserRoundIcon,
} from "lucide-react";

import {
  M3Badge,
  M3BadgeAnchor,
} from "@/material-3-ui/components/m3-badge/m3-badge";

const badgeExamples = [
  { icon: BellIcon, label: "Small badge", value: null },
  { icon: UserRoundIcon, label: "One digit", value: "1" },
  { icon: MailIcon, label: "Two digits", value: "12" },
  { icon: CircleAlertIcon, label: "Status", value: "New" },
  { icon: MessageSquareIcon, label: "Maximum count", value: "999+" },
] as const;

export default function M3BadgeDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6">
      {badgeExamples.map(({ icon: Icon, label, value }) => (
        <div className="flex flex-col items-center gap-3" key={label}>
          <M3BadgeAnchor aria-hidden="true">
            <Icon className="size-6" />
            {value === null ? <M3Badge /> : <M3Badge>{value}</M3Badge>}
          </M3BadgeAnchor>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
