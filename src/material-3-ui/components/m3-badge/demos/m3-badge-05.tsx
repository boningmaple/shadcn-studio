import { BellIcon } from "lucide-react";

import {
  M3Badge,
  M3BadgeAnchor,
} from "@/material-3-ui/components/m3-badge/m3-badge";
import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";

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

export default function M3BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {directions.map(({ accessibleLabel, direction, label }) => (
        <div
          className="flex flex-col items-center gap-3"
          dir={direction}
          key={direction}
        >
          <M3Button aria-label={accessibleLabel} variant="tonal">
            <M3BadgeAnchor>
              <BellIcon className="size-6" />
              <M3Badge aria-hidden="true">7</M3Badge>
            </M3BadgeAnchor>
          </M3Button>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
