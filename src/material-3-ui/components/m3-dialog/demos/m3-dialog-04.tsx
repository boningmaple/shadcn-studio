import { SaveIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3DialogTrigger,
  M3FullScreenDialog,
  M3FullScreenDialogBar,
  M3FullScreenDialogContent,
  M3FullScreenDialogTitle,
} from "@/material-3-ui/components/m3-dialog/m3-dialog";

export default function M3DialogDemo() {
  return (
    <M3DialogTrigger>
      <M3Button variant="filled">Open full screen</M3Button>
      <M3FullScreenDialog>
        <M3FullScreenDialogBar>
          <M3FullScreenDialogTitle>Edit profile</M3FullScreenDialogTitle>
          <M3Button slot="close" variant="text">
            <SaveIcon />
            Save
          </M3Button>
        </M3FullScreenDialogBar>
        <M3FullScreenDialogContent className="mx-auto grid w-full max-w-3xl gap-4">
          <p>
            Full-screen dialogs support complex tasks that need more room than a
            standard dialog.
          </p>
          <div className="grid gap-3 rounded-[16px] bg-[#f7f2fa] p-4 dark:bg-[#211f26]">
            <span className="font-medium text-[#1d1b20] dark:text-[#e6e0e9]">
              Contact details
            </span>
            <span>
              Add profile fields, review permissions, and save when the task is
              complete.
            </span>
          </div>
        </M3FullScreenDialogContent>
      </M3FullScreenDialog>
    </M3DialogTrigger>
  );
}
