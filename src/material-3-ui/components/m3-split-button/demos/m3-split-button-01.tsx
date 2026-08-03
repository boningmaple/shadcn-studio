import { CopyIcon, DownloadIcon, Share2Icon } from "lucide-react";

import {
  M3SplitButton,
  M3SplitButtonMenuItem,
} from "@/material-3-ui/components/m3-split-button/m3-split-button";

export default function M3SplitButtonDemo() {
  return (
    <M3SplitButton
      menuItems={
        <>
          <M3SplitButtonMenuItem icon={<CopyIcon />}>
            Copy link
          </M3SplitButtonMenuItem>
          <M3SplitButtonMenuItem icon={<Share2Icon />}>
            Share
          </M3SplitButtonMenuItem>
        </>
      }
      variant="filled"
    >
      <DownloadIcon />
      Download
    </M3SplitButton>
  );
}
