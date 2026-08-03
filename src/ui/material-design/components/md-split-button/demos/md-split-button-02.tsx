import { ArchiveIcon, SendIcon, StarIcon } from "lucide-react";

import {
  MDSplitButton,
  MDSplitButtonMenuItem,
} from "@/ui/material-design/components/md-split-button/md-split-button";

export default function MDSplitButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <MDSplitButton
        menuItems={
          <>
            <MDSplitButtonMenuItem icon={<ArchiveIcon />}>
              Archive draft
            </MDSplitButtonMenuItem>
            <MDSplitButtonMenuItem icon={<StarIcon />}>
              Mark important
            </MDSplitButtonMenuItem>
          </>
        }
        variant="tonal"
      >
        <SendIcon />
        Send
      </MDSplitButton>
      <MDSplitButton
        menuItems={
          <>
            <MDSplitButtonMenuItem>Save as template</MDSplitButtonMenuItem>
            <MDSplitButtonMenuItem>Discard</MDSplitButtonMenuItem>
          </>
        }
        variant="outlined"
      >
        Save
      </MDSplitButton>
    </div>
  );
}
