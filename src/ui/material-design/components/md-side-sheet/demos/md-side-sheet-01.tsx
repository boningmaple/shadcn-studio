import { FileTextIcon, ImageIcon, MessageSquareIcon } from "lucide-react";

import {
  MDSideSheetBody,
  MDSideSheetDescription,
  MDSideSheetHeader,
  MDSideSheetTitle,
  MDStandardSideSheet,
} from "@/ui/material-design/components/md-side-sheet/md-side-sheet";

const files = [
  {
    icon: FileTextIcon,
    label: "Proposal.docx",
    meta: "Updated 12 minutes ago",
  },
  {
    icon: ImageIcon,
    label: "Moodboard.png",
    meta: "12 MB",
  },
  {
    icon: MessageSquareIcon,
    label: "Review thread",
    meta: "8 open comments",
  },
];

export default function MDSideSheetDemo() {
  return (
    <div className="grid w-full max-w-3xl overflow-hidden rounded-[16px] border border-[#cac4d0] bg-[#fffbfe] md:grid-cols-[minmax(0,1fr)_auto] dark:border-[#49454f] dark:bg-[#1d1b20]">
      <div className="grid min-h-[28rem] gap-4 p-6">
        <div className="grid content-start gap-2">
          <span className="text-sm font-medium text-[#6750a4] dark:text-[#d0bcff]">
            Board
          </span>
          <h3 className="font-heading text-2xl leading-8 font-normal text-[#1d1b20] dark:text-[#e6e0e9]">
            Launch assets
          </h3>
          <p className="max-w-md text-sm leading-6 text-[#49454f] dark:text-[#cac4d0]">
            Standard side sheets keep supporting details visible while the main
            workspace remains available.
          </p>
        </div>
        <div className="grid gap-2 self-end">
          {files.map((file) => (
            <div
              className="grid grid-cols-[40px_minmax(0,1fr)] items-center gap-3 rounded-[16px] bg-[#f7f2fa] p-3 dark:bg-[#211f26]"
              key={file.label}
            >
              <file.icon className="size-5 text-[#6750a4] dark:text-[#d0bcff]" />
              <span className="grid min-w-0">
                <span className="truncate text-sm font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
                  {file.label}
                </span>
                <span className="truncate text-xs text-[#49454f] dark:text-[#cac4d0]">
                  {file.meta}
                </span>
              </span>
            </div>
          ))}
        </div>
      </div>
      <MDStandardSideSheet>
        <MDSideSheetHeader>
          <MDSideSheetTitle>Details</MDSideSheetTitle>
        </MDSideSheetHeader>
        <MDSideSheetBody className="grid content-start gap-4">
          <MDSideSheetDescription>
            The selected board has 14 assets, 3 pending approvals, and one
            scheduled handoff.
          </MDSideSheetDescription>
          <dl className="grid gap-3">
            <div className="grid gap-1">
              <dt className="text-xs font-medium text-[#49454f] dark:text-[#cac4d0]">
                Owner
              </dt>
              <dd className="text-base text-[#1d1b20] dark:text-[#e6e0e9]">
                Product marketing
              </dd>
            </div>
            <div className="grid gap-1">
              <dt className="text-xs font-medium text-[#49454f] dark:text-[#cac4d0]">
                Due
              </dt>
              <dd className="text-base text-[#1d1b20] dark:text-[#e6e0e9]">
                Friday, 4:00 PM
              </dd>
            </div>
          </dl>
        </MDSideSheetBody>
      </MDStandardSideSheet>
    </div>
  );
}
