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
      </Button>
      <SnackbarRegion queue={queue} />
    </>
  );
}
