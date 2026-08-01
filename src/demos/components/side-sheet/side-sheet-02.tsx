import { DownloadIcon, Share2Icon } from "lucide-react";

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

export default function SideSheetDemo() {
  return (
    <SideSheetTrigger>
      <Button variant="filled">Open modal side sheet</Button>
      <ModalSideSheet>
        <SideSheetHeader>
          <SideSheetTitle>Share report</SideSheetTitle>
          <SideSheetCloseButton />
        </SideSheetHeader>
        <SideSheetBody className="grid content-start gap-4">
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
        </SideSheetBody>
        <SideSheetFooter>
          <Button slot="close" variant="text">
            <DownloadIcon />
            Export
          </Button>
          <Button slot="close" variant="filled">
            <Share2Icon />
            Share
          </Button>
        </SideSheetFooter>
      </ModalSideSheet>
    </SideSheetTrigger>
  );
}
