import { parseDate } from "@internationalized/date";

import { MDDateRangePicker } from "@/ui/material-design/components/md-date-picker/md-date-picker";

export default function MDDatePickerDemo() {
  return (
    <div className="w-full max-w-xl">
      <MDDateRangePicker
        defaultValue={{
          end: parseDate("2026-09-18"),
          start: parseDate("2026-09-12"),
        }}
        description="Choose check-in and check-out dates."
        label="Trip dates"
      />
    </div>
  );
}
