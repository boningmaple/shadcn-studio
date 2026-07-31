import { BellIcon, MailIcon, MessageSquareIcon } from "lucide-react";

import { Badge, BadgeAnchor } from "@/components/badge/badge";
import { Button } from "@/components/button/button";

export default function BadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <Button aria-label="Notifications, new notification" variant="tonal">
        <BadgeAnchor>
          <BellIcon className="size-6" />
          <Badge aria-hidden="true" />
        </BadgeAnchor>
      </Button>
      <Button aria-label="Inbox, 5 unread messages" variant="tonal">
        <BadgeAnchor>
          <MailIcon className="size-6" />
          <Badge aria-hidden="true">5</Badge>
        </BadgeAnchor>
      </Button>
      <Button aria-label="Messages, 1,284 unread messages" variant="tonal">
        <BadgeAnchor>
          <MessageSquareIcon className="size-6" />
          <Badge aria-hidden="true">999+</Badge>
        </BadgeAnchor>
      </Button>
    </div>
  );
}
