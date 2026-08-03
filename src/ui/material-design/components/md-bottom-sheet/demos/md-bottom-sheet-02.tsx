import { CalendarDaysIcon, MapPinIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDBottomSheet,
  MDBottomSheetBody,
  MDBottomSheetContent,
  MDBottomSheetDescription,
  MDBottomSheetFooter,
  MDBottomSheetHeader,
  MDBottomSheetTitle,
  MDBottomSheetTrigger,
} from "@/ui/material-design/components/md-bottom-sheet/md-bottom-sheet";

export default function MDBottomSheetDemo() {
  return (
    <MDBottomSheet modal={false}>
      <MDBottomSheetTrigger render={<MDButton variant="tonal" />}>
        Show standard sheet
      </MDBottomSheetTrigger>
      <MDBottomSheetContent elevation="standard" height="compact" inset>
        <MDBottomSheetHeader>
          <MDBottomSheetTitle>Trip details</MDBottomSheetTitle>
          <MDBottomSheetDescription>
            Standard sheets keep the current view interactive.
          </MDBottomSheetDescription>
        </MDBottomSheetHeader>
        <MDBottomSheetBody className="grid gap-3">
          <div className="grid gap-3 rounded-[16px] bg-[#fffbfe] p-4 dark:bg-[#1d1b20]">
            <span className="inline-flex items-center gap-3 text-base leading-6 text-[#1d1b20] dark:text-[#e6e0e9]">
              <MapPinIcon className="size-5 text-[#6750a4] dark:text-[#d0bcff]" />
              Gate C18
            </span>
            <span className="inline-flex items-center gap-3 text-base leading-6 text-[#1d1b20] dark:text-[#e6e0e9]">
              <CalendarDaysIcon className="size-5 text-[#6750a4] dark:text-[#d0bcff]" />
              Boarding starts at 7:10 AM
            </span>
          </div>
        </MDBottomSheetBody>
        <MDBottomSheetFooter>
          <MDButton slot="close" variant="text">
            Done
          </MDButton>
        </MDBottomSheetFooter>
      </MDBottomSheetContent>
    </MDBottomSheet>
  );
}
