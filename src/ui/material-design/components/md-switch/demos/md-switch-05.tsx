import { BellIcon, MailIcon, MessageSquareIcon } from "lucide-react";

import { MDSwitch } from "@/ui/material-design/components/md-switch/md-switch";

export default function MDSwitchDemo() {
  return (
    <div className="grid w-full max-w-sm gap-1">
      <MDSwitch
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
      </MDSwitch>
      <MDSwitch className="w-full flex-row-reverse justify-between gap-4">
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
      </MDSwitch>
      <MDSwitch
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
      </MDSwitch>
    </div>
  );
}
