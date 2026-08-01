import { CalendarDaysIcon, MapPinIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import {
  BottomSheet,
  BottomSheetBody,
  BottomSheetContent,
  BottomSheetDescription,
  BottomSheetFooter,
  BottomSheetHeader,
  BottomSheetTitle,
  BottomSheetTrigger,
} from "@/components/bottom-sheet/bottom-sheet";

export default function BottomSheetDemo() {
  return (
    <BottomSheet modal={false}>
      <BottomSheetTrigger render={<Button variant="tonal" />}>
        Show standard sheet
      </BottomSheetTrigger>
      <BottomSheetContent elevation="standard" height="compact" inset>
        <BottomSheetHeader>
          <BottomSheetTitle>Trip details</BottomSheetTitle>
          <BottomSheetDescription>
            Standard sheets keep the current view interactive.
          </BottomSheetDescription>
        </BottomSheetHeader>
        <BottomSheetBody className="grid gap-3">
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
        </BottomSheetBody>
        <BottomSheetFooter>
          <Button slot="close" variant="text">
            Done
          </Button>
        </BottomSheetFooter>
      </BottomSheetContent>
    </BottomSheet>
  );
}
