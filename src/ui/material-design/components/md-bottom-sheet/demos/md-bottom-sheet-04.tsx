import { BellIcon, MailIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDBottomSheet,
  MDBottomSheetBody,
  MDBottomSheetCloseButton,
  MDBottomSheetContent,
  MDBottomSheetFooter,
  MDBottomSheetHeader,
  MDBottomSheetTitle,
  MDBottomSheetTrigger,
} from "@/ui/material-design/components/md-bottom-sheet/md-bottom-sheet";
import { MDSwitch } from "@/ui/material-design/components/md-switch/md-switch";

export default function MDBottomSheetDemo() {
  return (
    <MDBottomSheet>
      <MDBottomSheetTrigger render={<MDButton variant="filled" />}>
        Notification settings
      </MDBottomSheetTrigger>
      <MDBottomSheetContent height="medium" inset>
        <MDBottomSheetHeader className="grid-cols-[minmax(0,1fr)_auto] items-start">
          <MDBottomSheetTitle>Notifications</MDBottomSheetTitle>
          <MDBottomSheetCloseButton />
        </MDBottomSheetHeader>
        <MDBottomSheetBody className="grid gap-3">
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
            <MDSwitch defaultSelected aria-label="Push alerts" />
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
            <MDSwitch aria-label="Email digest" />
          </label>
        </MDBottomSheetBody>
        <MDBottomSheetFooter>
          <MDButton slot="close" variant="text">
            Cancel
          </MDButton>
          <MDButton slot="close" variant="filled">
            Apply
          </MDButton>
        </MDBottomSheetFooter>
      </MDBottomSheetContent>
    </MDBottomSheet>
  );
}
