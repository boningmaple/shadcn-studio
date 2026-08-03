import {
  ArrowLeftIcon,
  BellIcon,
  LockIcon,
  PaletteIcon,
  UserRoundIcon,
} from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3ModalSideSheet,
  M3SideSheetBody,
  M3SideSheetCloseButton,
  M3SideSheetDivider,
  M3SideSheetHeader,
  M3SideSheetTitle,
  M3SideSheetTrigger,
} from "@/material-3-ui/components/m3-side-sheet/m3-side-sheet";

const settings = [
  {
    icon: UserRoundIcon,
    label: "Account",
  },
  {
    icon: BellIcon,
    label: "Notifications",
  },
  {
    icon: LockIcon,
    label: "Privacy",
  },
  {
    icon: PaletteIcon,
    label: "Appearance",
  },
];

export default function M3SideSheetDemo() {
  return (
    <M3SideSheetTrigger>
      <M3Button variant="tonal">Open left sheet</M3Button>
      <M3ModalSideSheet side="left">
        <M3SideSheetHeader>
          <M3SideSheetCloseButton aria-label="Back">
            <ArrowLeftIcon />
          </M3SideSheetCloseButton>
          <M3SideSheetTitle>Settings</M3SideSheetTitle>
          <M3SideSheetCloseButton />
        </M3SideSheetHeader>
        <M3SideSheetDivider />
        <M3SideSheetBody className="px-0 py-2">
          <div className="grid">
            {settings.map((item) => (
              <button
                className="grid min-h-14 grid-cols-[40px_minmax(0,1fr)] items-center gap-4 px-6 text-left text-[#1d1b20] outline-none transition-colors hover:bg-[#1d1b20]/8 focus-visible:bg-[#1d1b20]/10 dark:text-[#e6e0e9] dark:hover:bg-[#e6e0e9]/8 dark:focus-visible:bg-[#e6e0e9]/10"
                key={item.label}
                type="button"
              >
                <item.icon className="size-6 text-[#49454f] dark:text-[#cac4d0]" />
                <span className="truncate text-base leading-6">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </M3SideSheetBody>
      </M3ModalSideSheet>
    </M3SideSheetTrigger>
  );
}
