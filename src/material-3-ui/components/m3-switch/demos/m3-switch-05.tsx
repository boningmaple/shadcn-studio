import { BellIcon, MailIcon, MessageSquareIcon } from "lucide-react";

import { M3Switch } from "@/material-3-ui/components/m3-switch/m3-switch";

export default function M3SwitchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <M3Switch
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
      </M3Switch>
      <M3Switch className="w-full flex-row-reverse justify-between gap-4">
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
      </M3Switch>
      <M3Switch
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
      </M3Switch>
    </div>
  );
}
