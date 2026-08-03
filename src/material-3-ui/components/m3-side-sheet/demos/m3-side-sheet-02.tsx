import { DownloadIcon, Share2Icon } from "lucide-react";

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

export default function M3SideSheetDemo() {
  return (
    <M3SideSheetTrigger>
      <M3Button variant="filled">Open modal side sheet</M3Button>
      <M3ModalSideSheet>
        <M3SideSheetHeader>
          <M3SideSheetTitle>Share report</M3SideSheetTitle>
          <M3SideSheetCloseButton />
        </M3SideSheetHeader>
        <M3SideSheetBody className="grid content-start gap-4">
          <p>
            Modal side sheets block the current page while giving more room than
            a dialog for a short related task.
          </p>
          <div className="grid gap-3 rounded-[16px] bg-[#fffbfe] p-4 dark:bg-[#1d1b20]">
            <span className="text-base leading-6 text-[#1d1b20] dark:text-[#e6e0e9]">
              Weekly performance report
            </span>
            <span className="text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]">
              Includes conversion trends, annotations, and campaign notes.
            </span>
          </div>
        </M3SideSheetBody>
        <M3SideSheetFooter>
          <M3Button slot="close" variant="text">
            <DownloadIcon />
            Export
          </M3Button>
          <M3Button slot="close" variant="filled">
            <Share2Icon />
            Share
          </M3Button>
        </M3SideSheetFooter>
      </M3ModalSideSheet>
    </M3SideSheetTrigger>
  );
}
