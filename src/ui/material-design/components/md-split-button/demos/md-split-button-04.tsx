import { SendIcon, TrashIcon } from "lucide-react";

import {
  MDSplitButton,
  MDSplitButtonMenuItem,
} from "@/ui/material-design/components/md-split-button/md-split-button";

export default function MDSplitButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDSplitButton
        isDisabled
        menuItems={
          <>
            <MDSplitButtonMenuItem>Send later</MDSplitButtonMenuItem>
            <MDSplitButtonMenuItem>Schedule send</MDSplitButtonMenuItem>
          </>
        }
        variant="filled"
      >
        <SendIcon />
        Disabled
      </MDSplitButton>
      <MDSplitButton
        menuItems={
          <>
            <MDSplitButtonMenuItem icon={<TrashIcon />} isDisabled>
              Delete permanently
            </MDSplitButtonMenuItem>
            <MDSplitButtonMenuItem>Move to archive</MDSplitButtonMenuItem>
          </>
        }
        variant="outlined"
      >
        Review
      </MDSplitButton>
    </div>
  );
}
