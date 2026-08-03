import { AlertTriangleIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3Dialog,
  M3DialogActionButton,
  M3DialogActions,
  M3DialogContent,
  M3DialogHeader,
  M3DialogTitle,
  M3DialogTrigger,
} from "@/material-3-ui/components/m3-dialog/m3-dialog";

export default function M3DialogDemo() {
  return (
    <M3DialogTrigger>
      <M3Button variant="outlined">Open alert</M3Button>
      <M3Dialog role="alertdialog">
        <M3DialogHeader>
          <AlertTriangleIcon className="size-6 text-[#b3261e] dark:text-[#f2b8b5]" />
          <M3DialogTitle>Delete project?</M3DialogTitle>
        </M3DialogHeader>
        <M3DialogContent>
          This permanently removes project files, comments, and release notes
          from the workspace.
        </M3DialogContent>
        <M3DialogActions>
          <M3DialogActionButton slot="close">Cancel</M3DialogActionButton>
          <M3DialogActionButton slot="close">Delete</M3DialogActionButton>
        </M3DialogActions>
      </M3Dialog>
    </M3DialogTrigger>
  );
}
