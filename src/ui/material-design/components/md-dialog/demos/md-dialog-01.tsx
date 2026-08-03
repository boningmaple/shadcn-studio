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
      <MDButton variant="filled">Open dialog</MDButton>
      <MDDialog>
        <MDDialogHeader>
          <MDDialogTitle>Discard draft?</MDDialogTitle>
        </MDDialogHeader>
        <MDDialogContent>
          Your current message has unsaved changes. You can keep editing or
          discard the draft now.
        </MDDialogContent>
        <MDDialogActions>
          <MDDialogActionButton slot="close">Cancel</MDDialogActionButton>
          <MDDialogActionButton slot="close">Discard</MDDialogActionButton>
        </MDDialogActions>
      </MDDialog>
    </MDDialogTrigger>
  );
}
