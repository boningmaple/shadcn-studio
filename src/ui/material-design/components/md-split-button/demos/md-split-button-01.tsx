import { CopyIcon, DownloadIcon, Share2Icon } from "lucide-react";

import {
  MDSplitButton,
  MDSplitButtonMenuItem,
} from "@/ui/material-design/components/md-split-button/md-split-button";

export default function MDSplitButtonDemo() {
  return (
    <MDSplitButton
      menuItems={
        <>
          <MDSplitButtonMenuItem icon={<CopyIcon />}>
            Copy link
          </MDSplitButtonMenuItem>
          <MDSplitButtonMenuItem icon={<Share2Icon />}>
            Share
          </MDSplitButtonMenuItem>
        </>
      }
      variant="filled"
    >
      <DownloadIcon />
      Download
    </MDSplitButton>
  );
}
