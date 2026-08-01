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
import { TextField } from "@/components/text-field/text-field";

export default function DialogDemo() {
  return (
    <DialogTrigger>
      <Button variant="tonal">Rename</Button>
      <Dialog>
        <DialogHeader>
          <DialogTitle>Rename collection</DialogTitle>
        </DialogHeader>
        <DialogContent className="grid gap-4">
          <p>Choose a short name that will be clear in navigation.</p>
          <TextField defaultValue="Material components" label="Name" />
        </DialogContent>
        <DialogActions>
          <DialogActionButton slot="close">Cancel</DialogActionButton>
          <DialogActionButton slot="close">Save</DialogActionButton>
        </DialogActions>
      </Dialog>
    </DialogTrigger>
  );
}
