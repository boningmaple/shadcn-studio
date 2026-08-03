import { CalendarDaysIcon, MapPinIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3BottomSheet,
  M3BottomSheetBody,
  M3BottomSheetContent,
  M3BottomSheetDescription,
  M3BottomSheetFooter,
  M3BottomSheetHeader,
  M3BottomSheetTitle,
  M3BottomSheetTrigger,
} from "@/material-3-ui/components/m3-bottom-sheet/m3-bottom-sheet";

export default function M3BottomSheetDemo() {
  return (
    <M3BottomSheet modal={false}>
      <M3BottomSheetTrigger render={<M3Button variant="tonal" />}>
        Show standard sheet
      </M3BottomSheetTrigger>
      <M3BottomSheetContent elevation="standard" height="compact" inset>
        <M3BottomSheetHeader>
          <M3BottomSheetTitle>Trip details</M3BottomSheetTitle>
          <M3BottomSheetDescription>
            Standard sheets keep the current view interactive.
          </M3BottomSheetDescription>
        </M3BottomSheetHeader>
        <M3BottomSheetBody className="grid gap-3">
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
        </M3BottomSheetBody>
        <M3BottomSheetFooter>
          <M3Button slot="close" variant="text">
            Done
          </M3Button>
        </M3BottomSheetFooter>
      </M3BottomSheetContent>
    </M3BottomSheet>
  );
}
