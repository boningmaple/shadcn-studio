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
      <M3Button variant="filled">Open dialog</M3Button>
      <M3Dialog>
        <M3DialogHeader>
          <M3DialogTitle>Discard draft?</M3DialogTitle>
        </M3DialogHeader>
        <M3DialogContent>
          Your current message has unsaved changes. You can keep editing or
          discard the draft now.
        </M3DialogContent>
        <M3DialogActions>
          <M3DialogActionButton slot="close">Cancel</M3DialogActionButton>
          <M3DialogActionButton slot="close">Discard</M3DialogActionButton>
        </M3DialogActions>
      </M3Dialog>
    </M3DialogTrigger>
  );
}
