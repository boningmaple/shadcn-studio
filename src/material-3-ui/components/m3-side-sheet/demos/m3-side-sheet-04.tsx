import { Clock3Icon, FilterIcon, StarIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3ModalSideSheet,
  M3SideSheetBody,
  M3SideSheetCloseButton,
  M3SideSheetFooter,
  M3SideSheetHeader,
  M3SideSheetTitle,
  M3SideSheetTrigger,
} from "@/material-3-ui/components/m3-side-sheet/m3-side-sheet";
import { M3Switch } from "@/material-3-ui/components/m3-switch/m3-switch";

export default function M3SideSheetDemo() {
  return (
    <M3SideSheetTrigger>
      <M3Button variant="outlined">Open filters</M3Button>
      <M3ModalSideSheet>
        <M3SideSheetHeader>
          <FilterIcon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
          <M3SideSheetTitle>Filters</M3SideSheetTitle>
          <M3SideSheetCloseButton />
        </M3SideSheetHeader>
        <M3SideSheetBody className="grid content-start gap-3">
          <label className="grid min-h-16 grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-4 rounded-[16px] bg-[#fffbfe] p-4 dark:bg-[#1d1b20]">
            <StarIcon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
            <span className="grid">
              <span className="text-base leading-6 text-[#1d1b20] dark:text-[#e6e0e9]">
                Starred only
              </span>
              <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
                Show items marked for follow-up.
              </span>
            </span>
            <M3Switch aria-label="Starred only" />
          </label>
          <label className="grid min-h-16 grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-4 rounded-[16px] bg-[#fffbfe] p-4 dark:bg-[#1d1b20]">
            <Clock3Icon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
            <span className="grid">
              <span className="text-base leading-6 text-[#1d1b20] dark:text-[#e6e0e9]">
                Due this week
              </span>
              <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
                Include deadlines through Friday.
              </span>
            </span>
            <M3Switch defaultSelected aria-label="Due this week" />
          </label>
        </M3SideSheetBody>
        <M3SideSheetFooter>
          <M3Button slot="close" variant="text">
            Clear
          </M3Button>
          <M3Button slot="close" variant="filled">
            Apply
          </M3Button>
        </M3SideSheetFooter>
      </M3ModalSideSheet>
    </M3SideSheetTrigger>
  );
}
