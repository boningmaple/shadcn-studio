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
    <div className="flex flex-wrap items-center justify-center gap-3">
      <Button
        variant="filled"
        onPress={() =>
          queue.add({ message: "Draft saved." }, { timeout: 3000 })
        }
      >
        Save draft
      </Button>
      <Button
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
      </Button>
      <SnackbarRegion queue={queue} />
    </div>
  );
}
