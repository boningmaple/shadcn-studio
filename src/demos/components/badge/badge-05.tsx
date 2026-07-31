import { BellIcon } from "lucide-react";

import { Badge, BadgeAnchor } from "@/components/badge/badge";
import { Button } from "@/components/button/button";

const directions = [
  {
    accessibleLabel: "Notifications, 7 unread",
    direction: "ltr",
    label: "Left to right",
  },
  {
    accessibleLabel: "الإشعارات، 7 غير مقروءة",
    direction: "rtl",
    label: "من اليمين إلى اليسار",
  },
] as const;

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {directions.map(({ accessibleLabel, direction, label }) => (
        <div
          className="flex flex-col items-center gap-3"
          dir={direction}
          key={direction}
        >
          <Button aria-label={accessibleLabel} variant="tonal">
            <BadgeAnchor>
              <BellIcon className="size-6" />
              <Badge aria-hidden="true">7</Badge>
            </BadgeAnchor>
          </Button>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
