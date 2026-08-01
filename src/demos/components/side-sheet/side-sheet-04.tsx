import { Clock3Icon, FilterIcon, StarIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import {
  ModalSideSheet,
  SideSheetBody,
  SideSheetCloseButton,
  SideSheetFooter,
  SideSheetHeader,
  SideSheetTitle,
  SideSheetTrigger,
} from "@/components/side-sheet/side-sheet";
import { Switch } from "@/components/switch/switch";

export default function SideSheetDemo() {
  return (
    <SideSheetTrigger>
      <Button variant="outlined">Open filters</Button>
      <ModalSideSheet>
        <SideSheetHeader>
          <FilterIcon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
          <SideSheetTitle>Filters</SideSheetTitle>
          <SideSheetCloseButton />
        </SideSheetHeader>
        <SideSheetBody className="grid content-start gap-3">
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
            <Switch aria-label="Starred only" />
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
            <Switch defaultSelected aria-label="Due this week" />
          </label>
        </SideSheetBody>
        <SideSheetFooter>
          <Button slot="close" variant="text">
            Clear
          </Button>
          <Button slot="close" variant="filled">
            Apply
          </Button>
        </SideSheetFooter>
      </ModalSideSheet>
    </SideSheetTrigger>
  );
}
