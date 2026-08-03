import { UNSTABLE_ToastQueue } from "react-aria-components";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import {
  MDSnackbarRegion,
  type MDSnackbarContent,
} from "@/ui/material-design/components/md-snackbar/md-snackbar";

const queue = new UNSTABLE_ToastQueue<MDSnackbarContent>({
  maxVisibleToasts: 1,
});

export default function MDSnackbarDemo() {
  return (
    <>
      <MDButton
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
      </MDButton>
      <MDSnackbarRegion queue={queue} />
    </>
  );
}
