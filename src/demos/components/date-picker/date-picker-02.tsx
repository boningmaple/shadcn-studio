import { parseDate } from "@internationalized/date";

import { DateRangePicker } from "@/components/date-picker/date-picker";

export default function DatePickerDemo() {
  return (
    <div className="w-full max-w-xl">
      <DateRangePicker
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
