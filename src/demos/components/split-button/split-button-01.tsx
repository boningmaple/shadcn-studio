import { CopyIcon, DownloadIcon, Share2Icon } from "lucide-react";

import {
  SplitButton,
  SplitButtonMenuItem,
} from "@/components/split-button/split-button";

export default function SplitButtonDemo() {
  return (
    <SplitButton
      menuItems={
        <>
          <SplitButtonMenuItem icon={<CopyIcon />}>
            Copy link
          </SplitButtonMenuItem>
          <SplitButtonMenuItem icon={<Share2Icon />}>Share</SplitButtonMenuItem>
        </>
      }
      variant="filled"
    >
      <DownloadIcon />
      Download
    </SplitButton>
  );
}
