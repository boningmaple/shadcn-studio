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
    <div className="flex flex-wrap items-center justify-center gap-3">
      <M3Button
        variant="filled"
        onPress={() =>
          queue.add({ message: "Draft saved." }, { timeout: 3000 })
        }
      >
        Save draft
      </M3Button>
      <M3Button
        variant="text"
        onPress={() =>
          queue.add(
            {
              actionLabel: "Retry",
              message: "Sync failed.",
            },
            { timeout: 5000 },
          )
        }
      >
        Fail sync
      </M3Button>
      <M3SnackbarRegion queue={queue} />
    </div>
  );
}
