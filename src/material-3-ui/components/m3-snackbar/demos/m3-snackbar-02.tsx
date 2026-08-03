import { UNSTABLE_ToastQueue } from "react-aria-components";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3SnackbarRegion,
  type M3SnackbarContent,
} from "@/material-3-ui/components/m3-snackbar/m3-snackbar";

const queue = new UNSTABLE_ToastQueue<M3SnackbarContent>({
  maxVisibleToasts: 1,
});

export default function M3SnackbarDemo() {
  return (
    <>
      <M3Button
        variant="tonal"
        onPress={() =>
          queue.add(
            {
              actionLabel: "Undo",
              message: "Message sent.",
              onAction: () =>
                queue.add({ message: "Message restored." }, { timeout: 3500 }),
            },
            { timeout: 5000 },
          )
        }
      >
        Send message
      </M3Button>
      <M3SnackbarRegion queue={queue} />
    </>
  );
}
