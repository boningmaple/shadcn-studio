import { parseDate } from "@internationalized/date";

import { M3ModalDatePicker } from "@/material-3-ui/components/m3-date-picker/m3-date-picker";

export default function M3DatePickerDemo() {
  return (
    <M3ModalDatePicker
      defaultValue={parseDate("2026-10-21")}
      supportingText="Calendar picker"
      title="Select delivery date"
      triggerLabel="Open date picker"
    />
  );
}
