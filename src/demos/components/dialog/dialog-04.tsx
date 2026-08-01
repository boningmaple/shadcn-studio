import { SaveIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import {
  DialogTrigger,
  FullScreenDialog,
  FullScreenDialogBar,
  FullScreenDialogContent,
  FullScreenDialogTitle,
} from "@/components/dialog/dialog";

export default function DialogDemo() {
  return (
    <DialogTrigger>
      <Button variant="filled">Open full screen</Button>
      <FullScreenDialog>
        <FullScreenDialogBar>
          <FullScreenDialogTitle>Edit profile</FullScreenDialogTitle>
          <Button slot="close" variant="text">
            <SaveIcon />
            Save
          </Button>
        </FullScreenDialogBar>
        <FullScreenDialogContent className="mx-auto grid w-full max-w-3xl gap-4">
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
        </FullScreenDialogContent>
      </FullScreenDialog>
    </DialogTrigger>
  );
}
