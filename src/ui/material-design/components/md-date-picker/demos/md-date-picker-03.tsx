import { parseDate } from "@internationalized/date";

import { MDModalDatePicker } from "@/ui/material-design/components/md-date-picker/md-date-picker";

export default function MDDatePickerDemo() {
  return (
    <MDModalDatePicker
      defaultValue={parseDate("2026-10-21")}
      supportingText="Calendar picker"
      title="Select delivery date"
      triggerLabel="Open date picker"
    />
  );
}
