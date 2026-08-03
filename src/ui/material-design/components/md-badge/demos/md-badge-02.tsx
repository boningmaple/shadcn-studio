import { BellIcon, MailIcon, MessageSquareIcon } from "lucide-react";

import {
  MDBadge,
  MDBadgeAnchor,
} from "@/ui/material-design/components/md-badge/md-badge";
import { MDButton } from "@/ui/material-design/components/md-button/md-button";

export default function MDBadgeDemo() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-4">
      <MDButton aria-label="Notifications, new notification" variant="tonal">
        <MDBadgeAnchor>
          <BellIcon className="size-6" />
          <MDBadge aria-hidden="true" />
        </MDBadgeAnchor>
      </MDButton>
      <MDButton aria-label="Inbox, 5 unread messages" variant="tonal">
        <MDBadgeAnchor>
          <MailIcon className="size-6" />
          <MDBadge aria-hidden="true">5</MDBadge>
        </MDBadgeAnchor>
      </MDButton>
      <MDButton aria-label="Messages, 1,284 unread messages" variant="tonal">
        <MDBadgeAnchor>
          <MessageSquareIcon className="size-6" />
          <MDBadge aria-hidden="true">999+</MDBadge>
        </MDBadgeAnchor>
      </MDButton>
    </div>
  );
}
