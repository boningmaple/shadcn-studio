import { SaveIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDDialogTrigger,
  MDFullScreenDialog,
  MDFullScreenDialogBar,
  MDFullScreenDialogContent,
  MDFullScreenDialogTitle,
} from "@/ui/material-design/components/md-dialog/md-dialog";

export default function MDDialogDemo() {
  return (
    <MDDialogTrigger>
      <MDButton variant="filled">Open full screen</MDButton>
      <MDFullScreenDialog>
        <MDFullScreenDialogBar>
          <MDFullScreenDialogTitle>Edit profile</MDFullScreenDialogTitle>
          <MDButton slot="close" variant="text">
            <SaveIcon />
            Save
          </MDButton>
        </MDFullScreenDialogBar>
        <MDFullScreenDialogContent className="mx-auto grid w-full max-w-3xl gap-4">
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
        </MDFullScreenDialogContent>
      </MDFullScreenDialog>
    </MDDialogTrigger>
  );
}
