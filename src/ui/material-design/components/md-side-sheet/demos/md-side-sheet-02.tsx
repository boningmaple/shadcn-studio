import { DownloadIcon, Share2Icon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDModalSideSheet,
  MDSideSheetBody,
  MDSideSheetCloseButton,
  MDSideSheetFooter,
  MDSideSheetHeader,
  MDSideSheetTitle,
  MDSideSheetTrigger,
} from "@/ui/material-design/components/md-side-sheet/md-side-sheet";

export default function MDSideSheetDemo() {
  return (
    <MDSideSheetTrigger>
      <MDButton variant="filled">Open modal side sheet</MDButton>
      <MDModalSideSheet>
        <MDSideSheetHeader>
          <MDSideSheetTitle>Share report</MDSideSheetTitle>
          <MDSideSheetCloseButton />
        </MDSideSheetHeader>
        <MDSideSheetBody className="grid content-start gap-4">
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
        </MDSideSheetBody>
        <MDSideSheetFooter>
          <MDButton slot="close" variant="text">
            <DownloadIcon />
            Export
          </MDButton>
          <MDButton slot="close" variant="filled">
            <Share2Icon />
            Share
          </MDButton>
        </MDSideSheetFooter>
      </MDModalSideSheet>
    </MDSideSheetTrigger>
  );
}
