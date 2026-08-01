import { SendIcon, TrashIcon } from "lucide-react";

import {
  SplitButton,
  SplitButtonMenuItem,
} from "@/components/split-button/split-button";

export default function SplitButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <SplitButton
        isDisabled
        menuItems={
          <>
            <SplitButtonMenuItem>Send later</SplitButtonMenuItem>
            <SplitButtonMenuItem>Schedule send</SplitButtonMenuItem>
          </>
        }
        variant="filled"
      >
        <SendIcon />
        Disabled
      </SplitButton>
      <SplitButton
        menuItems={
          <>
            <SplitButtonMenuItem icon={<TrashIcon />} isDisabled>
              Delete permanently
            </SplitButtonMenuItem>
            <SplitButtonMenuItem>Move to archive</SplitButtonMenuItem>
          </>
        }
        variant="outlined"
      >
        Review
      </SplitButton>
    </div>
  );
}
