import { UNSTABLE_ToastQueue } from "react-aria-components";

import { Button } from "@/components/button/button";
import {
  SnackbarRegion,
  type SnackbarContent,
} from "@/components/snackbar/snackbar";

const queue = new UNSTABLE_ToastQueue<SnackbarContent>({
  maxVisibleToasts: 1,
});

export default function SnackbarDemo() {
  return (
    <>
      <Button
        variant="outlined"
        onPress={() =>
          queue.add({
            closeLabel: "Close upload notice",
            message:
              "Upload paused. Check your connection before continuing the import.",
            showCloseButton: true,
          })
        }
      >
        Show notice
      </Button>
      <SnackbarRegion queue={queue} />
    </>
  );
}
