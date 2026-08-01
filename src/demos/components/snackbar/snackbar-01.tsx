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
      </Button>
      <SnackbarRegion queue={queue} />
    </>
  );
}
