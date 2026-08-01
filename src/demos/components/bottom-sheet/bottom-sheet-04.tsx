import { BellIcon, MailIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetCloseButton,
  BottomSheetContent,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@/components/bottom-sheet/bottom-sheet";
import { Switch } from "@/components/switch/switch";

export default function BottomSheetDemo() {
  return (
    <BottomSheet>
      <BottomSheetTrigger render={<Button variant="filled" />}>
        Notification settings
      </BottomSheetTrigger>
      <BottomSheetContent height="medium" inset>
        <BottomSheetHeader className="grid-cols-[minmax(0,1fr)_auto] items-start">
          <BottomSheetTitle>Notifications</BottomSheetTitle>
          <BottomSheetCloseButton />
        </BottomSheetHeader>
        <BottomSheetBody className="grid gap-3">
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
            <Switch defaultSelected aria-label="Push alerts" />
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
            <Switch aria-label="Email digest" />
          </label>
        </BottomSheetBody>
        <BottomSheetFooter>
          <Button slot="close" variant="text">
            Cancel
          </Button>
          <Button slot="close" variant="filled">
            Apply
          </Button>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
}
