import { BellIcon, MailIcon, MessageSquareIcon } from "lucide-react";

import {
  M3Badge,
  M3BadgeAnchor,
} from "@/material-3-ui/components/m3-badge/m3-badge";
import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";

export default function M3BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <M3Button aria-label="Notifications, new notification" variant="tonal">
        <M3BadgeAnchor>
          <BellIcon className="size-6" />
          <M3Badge aria-hidden="true" />
        </M3BadgeAnchor>
      </M3Button>
      <M3Button aria-label="Inbox, 5 unread messages" variant="tonal">
        <M3BadgeAnchor>
          <MailIcon className="size-6" />
          <M3Badge aria-hidden="true">5</M3Badge>
        </M3BadgeAnchor>
      </M3Button>
      <M3Button aria-label="Messages, 1,284 unread messages" variant="tonal">
        <M3BadgeAnchor>
          <MessageSquareIcon className="size-6" />
          <M3Badge aria-hidden="true">999+</M3Badge>
        </M3BadgeAnchor>
      </M3Button>
    </div>
  );
}
