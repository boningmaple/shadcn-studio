import {
  Clock3Icon,
  CoffeeIcon,
  MessageSquareIcon,
  PlaneIcon,
} from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3BottomSheet,
  M3BottomSheetBody,
  M3BottomSheetContent,
  M3BottomSheetDescription,
  M3BottomSheetHeader,
  M3BottomSheetTitle,
  M3BottomSheetTrigger,
} from "@/material-3-ui/components/m3-bottom-sheet/m3-bottom-sheet";

const itinerary = [
  {
    icon: CoffeeIcon,
    label: "Coffee with Maya",
    time: "6:30 AM",
  },
  {
    icon: PlaneIcon,
    label: "Flight 482 boarding",
    time: "7:10 AM",
  },
  {
    icon: MessageSquareIcon,
    label: "Team arrival thread",
    time: "8:45 AM",
  },
  {
    icon: Clock3Icon,
    label: "Hotel check-in window",
    time: "2:00 PM",
  },
];

export default function M3BottomSheetDemo() {
  return (
    <M3BottomSheet defaultSnapPoint="18rem" snapPoints={["18rem", 0.86]}>
      <M3BottomSheetTrigger render={<M3Button variant="outlined" />}>
        Open snapping sheet
      </M3BottomSheetTrigger>
      <M3BottomSheetContent height="tall" inset>
        <M3BottomSheetHeader>
          <M3BottomSheetTitle>Today in Sydney</M3BottomSheetTitle>
          <M3BottomSheetDescription>
            Drag the handle to move between compact and expanded positions.
          </M3BottomSheetDescription>
        </M3BottomSheetHeader>
        <M3BottomSheetBody className="px-0">
          <div className="grid py-2">
            {itinerary.map((item) => (
              <div
                className="grid min-h-16 grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-4 px-6 py-2"
                key={item.label}
              >
                <item.icon className="size-6 text-[#6750a4] dark:text-[#d0bcff]" />
                <span className="truncate text-base leading-6 text-[#1d1b20] dark:text-[#e6e0e9]">
                  {item.label}
                </span>
                <span className="text-xs leading-4 text-[#49454f] dark:text-[#cac4d0]">
                  {item.time}
                </span>
              </div>
            ))}
          </div>
        </M3BottomSheetBody>
      </M3BottomSheetContent>
    </M3BottomSheet>
  );
}
