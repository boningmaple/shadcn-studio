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
import { MDTextField } from "@/ui/material-design/components/md-text-field/md-text-field";

export default function MDDialogDemo() {
  return (
    <MDDialogTrigger>
      <MDButton variant="tonal">Rename</MDButton>
      <MDDialog>
        <MDDialogHeader>
          <MDDialogTitle>Rename collection</MDDialogTitle>
        </MDDialogHeader>
        <MDDialogContent className="grid gap-4">
          <p>Choose a short name that will be clear in navigation.</p>
          <MDTextField defaultValue="Material components" label="Name" />
        </MDDialogContent>
        <MDDialogActions>
          <MDDialogActionButton slot="close">Cancel</MDDialogActionButton>
          <MDDialogActionButton slot="close">Save</MDDialogActionButton>
        </MDDialogActions>
      </MDDialog>
    </MDDialogTrigger>
  );
}
