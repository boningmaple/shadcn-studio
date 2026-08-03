import {
  ArrowLeftIcon,
  BellIcon,
  LockIcon,
  PaletteIcon,
  UserRoundIcon,
} from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDModalSideSheet,
  MDSideSheetBody,
  MDSideSheetCloseButton,
  MDSideSheetDivider,
  MDSideSheetHeader,
  MDSideSheetTitle,
  MDSideSheetTrigger,
} from "@/ui/material-design/components/md-side-sheet/md-side-sheet";

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

export default function MDSideSheetDemo() {
  return (
    <MDSideSheetTrigger>
      <MDButton variant="tonal">Open left sheet</MDButton>
      <MDModalSideSheet side="left">
        <MDSideSheetHeader>
          <MDSideSheetCloseButton aria-label="Back">
            <ArrowLeftIcon />
          </MDSideSheetCloseButton>
          <MDSideSheetTitle>Settings</MDSideSheetTitle>
          <MDSideSheetCloseButton />
        </MDSideSheetHeader>
        <MDSideSheetDivider />
        <MDSideSheetBody className="px-0 py-2">
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
        </MDSideSheetBody>
      </MDModalSideSheet>
    </MDSideSheetTrigger>
  );
}
