import { BellIcon, MailIcon, MessageSquareIcon, PlusIcon } from "lucide-react";

import {
  MDFABMenu,
  MDFABMenuItem,
} from "@/features/ui-material-design/components/md-fab-menu/md-fab-menu";
import { MDFABButton } from "@/features/ui-material-design/components/md-fab/md-fab";

export default function MDFABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <MDFABMenu
        defaultOpen
        label="Notifications"
        trigger={
          <MDFABButton aria-label="Open notifications menu" color="surface">
            <PlusIcon />
          </MDFABButton>
        }
      >
        <MDFABMenuItem icon={<BellIcon />}>Reminder</MDFABMenuItem>
        <MDFABMenuItem icon={<MailIcon />}>Email</MDFABMenuItem>
        <MDFABMenuItem icon={<MessageSquareIcon />}>Message</MDFABMenuItem>
      </MDFABMenu>
    </div>
  );
}
