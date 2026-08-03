import { parseDate } from "@internationalized/date";

import { MDDatePicker } from "@/ui/material-design/components/md-date-picker/md-date-picker";

export default function MDDatePickerDemo() {
  return (
    <div className="w-full max-w-sm">
      <MDDatePicker
        defaultValue={parseDate("2026-08-14")}
        description="Use the field or open the calendar."
        label="Start date"
      />
    </div>
  );
}
