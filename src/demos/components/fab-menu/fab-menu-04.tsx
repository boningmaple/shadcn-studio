import { BellIcon, MailIcon, MessageSquareIcon, PlusIcon } from "lucide-react";

import { FABButton } from "@/components/fab/fab";
import { FABMenu, FABMenuItem } from "@/components/fab-menu/fab-menu";

export default function FABMenuDemo() {
  return (
    <div className="flex w-full justify-center py-16">
      <FABMenu
        defaultOpen
        label="Notifications"
        trigger={
          <FABButton aria-label="Open notifications menu" color="surface">
            <PlusIcon />
          </FABButton>
        }
      >
        <FABMenuItem icon={<BellIcon />}>Reminder</FABMenuItem>
        <FABMenuItem icon={<MailIcon />}>Email</FABMenuItem>
        <FABMenuItem icon={<MessageSquareIcon />}>Message</FABMenuItem>
      </FABMenu>
    </div>
  );
}
