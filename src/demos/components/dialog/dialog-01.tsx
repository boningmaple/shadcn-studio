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
      <Button variant="filled">Open dialog</Button>
      <Dialog>
        <DialogHeader>
          <DialogTitle>Discard draft?</DialogTitle>
        </DialogHeader>
        <DialogContent>
          Your current message has unsaved changes. You can keep editing or
          discard the draft now.
        </DialogContent>
        <DialogActions>
          <DialogActionButton slot="close">Cancel</DialogActionButton>
          <DialogActionButton slot="close">Discard</DialogActionButton>
        </DialogActions>
      </Dialog>
    </DialogTrigger>
  );
}
