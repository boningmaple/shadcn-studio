import { ArchiveIcon, LinkIcon, Share2Icon } from "lucide-react";

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

const actions = [
  {
    icon: Share2Icon,
    label: "Share board",
    supportingText: "Send a view-only link to collaborators.",
  },
  {
    icon: LinkIcon,
    label: "Copy link",
    supportingText: "Place a private project link on the clipboard.",
  },
  {
    icon: ArchiveIcon,
    label: "Archive",
    supportingText: "Move this board out of the active workspace.",
  },
];

export default function M3BottomSheetDemo() {
  return (
    <M3BottomSheet>
      <M3BottomSheetTrigger render={<M3Button variant="filled" />}>
        Open bottom sheet
      </M3BottomSheetTrigger>
      <M3BottomSheetContent>
        <M3BottomSheetHeader>
          <M3BottomSheetTitle>Project actions</M3BottomSheetTitle>
          <M3BottomSheetDescription>
            Choose one quick action for the current board.
          </M3BottomSheetDescription>
        </M3BottomSheetHeader>
        <M3BottomSheetBody className="px-0 pb-4">
          <div className="grid py-2">
            {actions.map((action) => (
              <button
                className="grid min-h-16 grid-cols-[40px_minmax(0,1fr)] items-center gap-4 px-6 py-2 text-left text-[#1d1b20] outline-none transition-colors hover:bg-[#1d1b20]/8 focus-visible:bg-[#1d1b20]/10 dark:text-[#e6e0e9] dark:hover:bg-[#e6e0e9]/8 dark:focus-visible:bg-[#e6e0e9]/10"
                key={action.label}
                type="button"
              >
                <action.icon className="size-6 text-[#49454f] dark:text-[#cac4d0]" />
                <span className="grid min-w-0">
                  <span className="truncate text-base leading-6">
                    {action.label}
                  </span>
                  <span className="line-clamp-1 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
                    {action.supportingText}
                  </span>
                </span>
              </button>
            ))}
          </div>
        </M3BottomSheetBody>
      </M3BottomSheetContent>
    </M3BottomSheet>
  );
}
