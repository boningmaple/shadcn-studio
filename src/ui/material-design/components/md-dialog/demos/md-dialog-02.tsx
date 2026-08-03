import { AlertTriangleIcon } from "lucide-react";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDDialog,
  MDDialogActionButton,
  MDDialogActions,
  MDDialogContent,
  MDDialogHeader,
  MDDialogTitle,
  MDDialogTrigger,
} from "@/ui/material-design/components/md-dialog/md-dialog";

export default function MDDialogDemo() {
  return (
    <MDDialogTrigger>
      <MDButton variant="outlined">Open alert</MDButton>
      <MDDialog role="alertdialog">
        <MDDialogHeader>
          <AlertTriangleIcon className="size-6 text-[#b3261e] dark:text-[#f2b8b5]" />
          <MDDialogTitle>Delete project?</MDDialogTitle>
        </MDDialogHeader>
        <MDDialogContent>
          This permanently removes project files, comments, and release notes
          from the workspace.
        </MDDialogContent>
        <MDDialogActions>
          <MDDialogActionButton slot="close">Cancel</MDDialogActionButton>
          <MDDialogActionButton slot="close">Delete</MDDialogActionButton>
        </MDDialogActions>
      </MDDialog>
    </MDDialogTrigger>
  );
}
