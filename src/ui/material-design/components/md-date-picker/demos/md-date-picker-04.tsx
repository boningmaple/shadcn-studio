import { parseDate } from "@internationalized/date";

import { MDModalDateInput } from "@/ui/material-design/components/md-date-picker/md-date-picker";

export default function MDDatePickerDemo() {
  return (
    <MDModalDateInput
      defaultValue={parseDate("1990-04-18")}
      description="Enter month, day, and year."
      label="Birthday"
      supportingText="Manual entry"
      title="Enter birthday"
      triggerLabel="Open date input"
    />
  );
}
