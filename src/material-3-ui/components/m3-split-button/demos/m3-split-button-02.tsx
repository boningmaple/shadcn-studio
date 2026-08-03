import { ArchiveIcon, SendIcon, StarIcon } from "lucide-react";

import {
  M3SplitButton,
  M3SplitButtonMenuItem,
} from "@/material-3-ui/components/m3-split-button/m3-split-button";

export default function M3SplitButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <M3SplitButton
        menuItems={
          <>
            <M3SplitButtonMenuItem icon={<ArchiveIcon />}>
              Archive draft
            </M3SplitButtonMenuItem>
            <M3SplitButtonMenuItem icon={<StarIcon />}>
              Mark important
            </M3SplitButtonMenuItem>
          </>
        }
        variant="tonal"
      >
        <SendIcon />
        Send
      </M3SplitButton>
      <M3SplitButton
        menuItems={
          <>
            <M3SplitButtonMenuItem>Save as template</M3SplitButtonMenuItem>
            <M3SplitButtonMenuItem>Discard</M3SplitButtonMenuItem>
          </>
        }
        variant="outlined"
      >
        Save
      </M3SplitButton>
    </div>
  );
}
