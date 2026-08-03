import { BellIcon, MailIcon, MessageSquareIcon, PlusIcon } from "lucide-react";

import { M3FABButton } from "@/material-3-ui/components/m3-fab/m3-fab";
import {
  M3FABMenu,
  M3FABMenuItem,
} from "@/material-3-ui/components/m3-fab-menu/m3-fab-menu";

export default function M3FABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <M3FABMenu
        defaultOpen
        label="Notifications"
        trigger={
          <M3FABButton aria-label="Open notifications menu" color="surface">
            <PlusIcon />
          </M3FABButton>
        }
      >
        <M3FABMenuItem icon={<BellIcon />}>Reminder</M3FABMenuItem>
        <M3FABMenuItem icon={<MailIcon />}>Email</M3FABMenuItem>
        <M3FABMenuItem icon={<MessageSquareIcon />}>Message</M3FABMenuItem>
      </M3FABMenu>
    </div>
  );
}
