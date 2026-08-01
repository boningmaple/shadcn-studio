import { ArchiveIcon, SendIcon, StarIcon } from "lucide-react";

import {
  SplitButton,
  SplitButtonMenuItem,
} from "@/components/split-button/split-button";

export default function SplitButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <SplitButton
        menuItems={
          <>
            <SplitButtonMenuItem icon={<ArchiveIcon />}>
              Archive draft
            </SplitButtonMenuItem>
            <SplitButtonMenuItem icon={<StarIcon />}>
              Mark important
            </SplitButtonMenuItem>
          </>
        }
        variant="tonal"
      >
        <SendIcon />
        Send
      </SplitButton>
      <SplitButton
        menuItems={
          <>
            <SplitButtonMenuItem>Save as template</SplitButtonMenuItem>
            <SplitButtonMenuItem>Discard</SplitButtonMenuItem>
          </>
        }
        variant="outlined"
      >
        Save
      </SplitButton>
    </div>
  );
}
