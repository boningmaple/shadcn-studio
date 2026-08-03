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
      </MDButton>
      <MDSnackbarRegion queue={queue} />
    </>
  );
}
