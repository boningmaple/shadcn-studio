import { SendIcon, TrashIcon } from "lucide-react";

import {
  M3SplitButton,
  M3SplitButtonMenuItem,
} from "@/material-3-ui/components/m3-split-button/m3-split-button";

export default function M3SplitButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <M3SplitButton
        isDisabled
        menuItems={
          <>
            <M3SplitButtonMenuItem>Send later</M3SplitButtonMenuItem>
            <M3SplitButtonMenuItem>Schedule send</M3SplitButtonMenuItem>
          </>
        }
        variant="filled"
      >
        <SendIcon />
        Disabled
      </M3SplitButton>
      <M3SplitButton
        menuItems={
          <>
            <M3SplitButtonMenuItem icon={<TrashIcon />} isDisabled>
              Delete permanently
            </M3SplitButtonMenuItem>
            <M3SplitButtonMenuItem>Move to archive</M3SplitButtonMenuItem>
          </>
        }
        variant="outlined"
      >
        Review
      </M3SplitButton>
    </div>
  );
}
