import { AlertTriangleIcon } from "lucide-react";

import { Button } from "@/components/button/button";
import {
  Dialog,
  DialogActionButton,
  DialogActions,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/dialog/dialog";

export default function DialogDemo() {
  return (
    <DialogTrigger>
      <Button variant="outlined">Open alert</Button>
      <Dialog role="alertdialog">
        <DialogHeader>
          <AlertTriangleIcon className="size-6 text-[#b3261e] dark:text-[#f2b8b5]" />
          <DialogTitle>Delete project?</DialogTitle>
        </DialogHeader>
        <DialogContent>
          This permanently removes project files, comments, and release notes
          from the workspace.
        </DialogContent>
        <DialogActions>
          <DialogActionButton slot="close">Cancel</DialogActionButton>
          <DialogActionButton slot="close">Delete</DialogActionButton>
        </DialogActions>
      </Dialog>
    </DialogTrigger>
  );
}
