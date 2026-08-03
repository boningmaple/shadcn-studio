import { BellIcon, MailIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3BottomSheet,
  M3BottomSheetBody,
  M3BottomSheetCloseButton,
  M3BottomSheetContent,
  M3BottomSheetFooter,
  M3BottomSheetHeader,
  M3BottomSheetTitle,
  M3BottomSheetTrigger,
} from "@/material-3-ui/components/m3-bottom-sheet/m3-bottom-sheet";
import { M3Switch } from "@/material-3-ui/components/m3-switch/m3-switch";

export default function M3BottomSheetDemo() {
  return (
    <M3BottomSheet>
      <M3BottomSheetTrigger render={<M3Button variant="filled" />}>
        Notification settings
      </M3BottomSheetTrigger>
      <M3BottomSheetContent height="medium" inset>
        <M3BottomSheetHeader className="grid-cols-[minmax(0,1fr)_auto] items-start">
          <M3BottomSheetTitle>Notifications</M3BottomSheetTitle>
          <M3BottomSheetCloseButton />
        </M3BottomSheetHeader>
        <M3BottomSheetBody className="grid gap-3">
          <label className="grid min-h-16 grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-4 rounded-[16px] bg-[#fffbfe] p-4 dark:bg-[#1d1b20]">
            <BellIcon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
            <span className="grid">
              <span className="text-base leading-6 text-[#1d1b20] dark:text-[#e6e0e9]">
                Push alerts
              </span>
              <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
                Receive alerts for mentions and approvals.
              </span>
            </span>
            <M3Switch defaultSelected aria-label="Push alerts" />
          </label>
          <label className="grid min-h-16 grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-4 rounded-[16px] bg-[#fffbfe] p-4 dark:bg-[#1d1b20]">
            <MailIcon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
            <span className="grid">
              <span className="text-base leading-6 text-[#1d1b20] dark:text-[#e6e0e9]">
                Email digest
              </span>
              <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
                Collect low-priority updates into a daily summary.
              </span>
            </span>
            <M3Switch aria-label="Email digest" />
          </label>
        </M3BottomSheetBody>
        <M3BottomSheetFooter>
          <M3Button slot="close" variant="text">
            Cancel
          </M3Button>
          <M3Button slot="close" variant="filled">
            Apply
          </M3Button>
        </M3BottomSheetFooter>
      </M3BottomSheetContent>
    </M3BottomSheet>
  );
}
