import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react";

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
            <M3SplitButtonMenuItem icon={<CalendarIcon />}>
              Schedule
            </M3SplitButtonMenuItem>
            <M3SplitButtonMenuItem icon={<ClockIcon />}>
              Save for later
            </M3SplitButtonMenuItem>
          </>
        }
        size="xs"
        variant="filled"
      >
        <PlusIcon />
        Add
      </M3SplitButton>
      <M3SplitButton
        menuItems={
          <>
            <M3SplitButtonMenuItem>Duplicate</M3SplitButtonMenuItem>
            <M3SplitButtonMenuItem>Move</M3SplitButtonMenuItem>
          </>
        }
        size="md"
        variant="tonal"
      >
        Create
      </M3SplitButton>
    </div>
  );
}
