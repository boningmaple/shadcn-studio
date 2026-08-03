import { parseDate } from "@internationalized/date";

import { M3DatePicker } from "@/material-3-ui/components/m3-date-picker/m3-date-picker";

export default function M3DatePickerDemo() {
  return (
    <div className="w-full max-w-sm">
      <M3DatePicker
        defaultValue={parseDate("2026-08-14")}
        description="Use the field or open the calendar."
        label="Start date"
      />
    </div>
  );
}
