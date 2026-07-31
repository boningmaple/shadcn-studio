import {
  BellIcon,
  CircleAlertIcon,
  MailIcon,
  MessageSquareIcon,
  UserRoundIcon,
} from "lucide-react";

import { Badge, BadgeAnchor } from "@/components/badge/badge";

const badgeExamples = [
  { icon: BellIcon, label: "Small badge", value: null },
  { icon: UserRoundIcon, label: "One digit", value: "1" },
  { icon: MailIcon, label: "Two digits", value: "12" },
  { icon: CircleAlertIcon, label: "Status", value: "New" },
  { icon: MessageSquareIcon, label: "Maximum count", value: "999+" },
] as const;

export default function BadgeDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-6">
      {badgeExamples.map(({ icon: Icon, label, value }) => (
        <div className="flex flex-col items-center gap-3" key={label}>
          <BadgeAnchor aria-hidden="true">
            <Icon className="size-6" />
            {value === null ? <Badge /> : <Badge>{value}</Badge>}
          </BadgeAnchor>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
