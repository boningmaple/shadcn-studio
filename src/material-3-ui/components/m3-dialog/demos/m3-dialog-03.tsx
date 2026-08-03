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
import { M3TextField } from "@/material-3-ui/components/m3-text-field/m3-text-field";

export default function M3DialogDemo() {
  return (
    <M3DialogTrigger>
      <M3Button variant="tonal">Rename</M3Button>
      <M3Dialog>
        <M3DialogHeader>
          <M3DialogTitle>Rename collection</M3DialogTitle>
        </M3DialogHeader>
        <M3DialogContent className="grid gap-4">
          <p>Choose a short name that will be clear in navigation.</p>
          <M3TextField defaultValue="Material components" label="Name" />
        </M3DialogContent>
        <M3DialogActions>
          <M3DialogActionButton slot="close">Cancel</M3DialogActionButton>
          <M3DialogActionButton slot="close">Save</M3DialogActionButton>
        </M3DialogActions>
      </M3Dialog>
    </M3DialogTrigger>
  );
}
