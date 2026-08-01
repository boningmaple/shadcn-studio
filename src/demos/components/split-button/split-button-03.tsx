import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react";

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
            <SplitButtonMenuItem icon={<CalendarIcon />}>
              Schedule
            </SplitButtonMenuItem>
            <SplitButtonMenuItem icon={<ClockIcon />}>
              Save for later
            </SplitButtonMenuItem>
          </>
        }
        size="xs"
        variant="filled"
      >
        <PlusIcon />
        Add
      </SplitButton>
      <SplitButton
        menuItems={
          <>
            <SplitButtonMenuItem>Duplicate</SplitButtonMenuItem>
            <SplitButtonMenuItem>Move</SplitButtonMenuItem>
          </>
        }
        size="md"
        variant="tonal"
      >
        Create
      </SplitButton>
    </div>
  );
}
