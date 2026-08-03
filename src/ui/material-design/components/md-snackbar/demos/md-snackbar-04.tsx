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
    <div className="flex flex-wrap items-center justify-center gap-3">
      <MDButton
        variant="filled"
        onPress={() =>
          queue.add({ message: "Draft saved." }, { timeout: 3000 })
        }
      >
        Save draft
      </MDButton>
      <MDButton
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
      </MDButton>
      <MDSnackbarRegion queue={queue} />
    </div>
  );
}
