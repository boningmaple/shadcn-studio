import { parseDate } from "@internationalized/date";

import { DatePicker } from "@/components/date-picker/date-picker";

export default function DatePickerDemo() {
  return (
    <div className="w-full max-w-sm">
      <DatePicker
        defaultValue={parseDate("2026-08-14")}
        description="Use the field or open the calendar."
        label="Start date"
      />
    </div>
  );
}
