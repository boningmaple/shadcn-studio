import { Clock3Icon, FilterIcon, StarIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDModalSideSheet,
  MDSideSheetBody,
  MDSideSheetCloseButton,
  MDSideSheetFooter,
  MDSideSheetHeader,
  MDSideSheetTitle,
  MDSideSheetTrigger,
} from "@/ui/material-design/components/md-side-sheet/md-side-sheet";
import { MDSwitch } from "@/ui/material-design/components/md-switch/md-switch";

export default function MDSideSheetDemo() {
  return (
    <MDSideSheetTrigger>
      <MDButton variant="outlined">Open filters</MDButton>
      <MDModalSideSheet>
        <MDSideSheetHeader>
          <FilterIcon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
          <MDSideSheetTitle>Filters</MDSideSheetTitle>
          <MDSideSheetCloseButton />
        </MDSideSheetHeader>
        <MDSideSheetBody className="grid content-start gap-3">
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
            <MDSwitch aria-label="Starred only" />
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
            <MDSwitch defaultSelected aria-label="Due this week" />
          </label>
        </MDSideSheetBody>
        <MDSideSheetFooter>
          <MDButton slot="close" variant="text">
            Clear
          </MDButton>
          <MDButton slot="close" variant="filled">
            Apply
          </MDButton>
        </MDSideSheetFooter>
      </MDModalSideSheet>
    </MDSideSheetTrigger>
  );
}
