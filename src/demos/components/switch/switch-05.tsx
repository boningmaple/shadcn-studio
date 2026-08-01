import { BellIcon, MailIcon, MessageSquareIcon } from "lucide-react";

import { Switch } from "@/components/switch/switch";

export default function SwitchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <Switch
        className="w-full flex-row-reverse justify-between gap-4"
        defaultSelected
      >
        <span className="flex items-center gap-3">
          <BellIcon
            aria-hidden="true"
            className="size-5 text-[#49454f] dark:text-[#cac4d0]"
          />
          <span className="grid gap-0.5">
            <span>Product updates</span>
            <span className="text-xs leading-4 text-[#49454f] dark:text-[#cac4d0]">
              News about features and releases
            </span>
          </span>
        </span>
      </Switch>
      <Switch className="w-full flex-row-reverse justify-between gap-4">
        <span className="flex items-center gap-3">
          <MailIcon
            aria-hidden="true"
            className="size-5 text-[#49454f] dark:text-[#cac4d0]"
          />
          <span className="grid gap-0.5">
            <span>Weekly digest</span>
            <span className="text-xs leading-4 text-[#49454f] dark:text-[#cac4d0]">
              A summary of your account activity
            </span>
          </span>
        </span>
      </Switch>
      <Switch
        className="w-full flex-row-reverse justify-between gap-4"
        defaultSelected
      >
        <span className="flex items-center gap-3">
          <MessageSquareIcon
            aria-hidden="true"
            className="size-5 text-[#49454f] dark:text-[#cac4d0]"
          />
          <span className="grid gap-0.5">
            <span>Direct messages</span>
            <span className="text-xs leading-4 text-[#49454f] dark:text-[#cac4d0]">
              Alerts for new private messages
            </span>
          </span>
        </span>
      </Switch>
    </div>
  );
}
