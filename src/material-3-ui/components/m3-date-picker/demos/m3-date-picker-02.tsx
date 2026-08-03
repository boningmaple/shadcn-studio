import { parseDate } from "@internationalized/date";

import { M3DateRangePicker } from "@/material-3-ui/components/m3-date-picker/m3-date-picker";

export default function M3DatePickerDemo() {
  return (
    <div className="w-full max-w-xl">
      <M3DateRangePicker
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
