import { BellIcon } from "lucide-react";

import {
  MDBadge,
  MDBadgeAnchor,
} from "@/ui/material-design/components/md-badge/md-badge";
import { MDButton } from "@/ui/material-design/components/md-button/md-button";

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

export default function MDBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-8">
      {directions.map(({ accessibleLabel, direction, label }) => (
        <div
          className="flex flex-col items-center gap-3"
          dir={direction}
          key={direction}
        >
          <MDButton aria-label={accessibleLabel} variant="tonal">
            <MDBadgeAnchor>
              <BellIcon className="size-6" />
              <MDBadge aria-hidden="true">7</MDBadge>
            </MDBadgeAnchor>
          </MDButton>
          <span className="text-xs text-muted-foreground">{label}</span>
        </div>
      ))}
    </div>
  );
}
