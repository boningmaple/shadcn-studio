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
        variant="filled"
        onPress={() =>
          queue.add(
            {
              message: "Project archived.",
            },
            { timeout: 4000 },
          )
        }
      >
        Show snackbar
      </MDButton>
      <MDSnackbarRegion queue={queue} />
    </>
  );
}
