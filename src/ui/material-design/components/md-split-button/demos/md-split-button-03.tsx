import { CalendarIcon, ClockIcon, PlusIcon } from "lucide-react";

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
            <MDSplitButtonMenuItem icon={<CalendarIcon />}>
              Schedule
            </MDSplitButtonMenuItem>
            <MDSplitButtonMenuItem icon={<ClockIcon />}>
              Save for later
            </MDSplitButtonMenuItem>
          </>
        }
        size="xs"
        variant="filled"
      >
        <PlusIcon />
        Add
      </MDSplitButton>
      <MDSplitButton
        menuItems={
          <>
            <MDSplitButtonMenuItem>Duplicate</MDSplitButtonMenuItem>
            <MDSplitButtonMenuItem>Move</MDSplitButtonMenuItem>
          </>
        }
        size="md"
        variant="tonal"
      >
        Create
      </MDSplitButton>
    </div>
  );
}
