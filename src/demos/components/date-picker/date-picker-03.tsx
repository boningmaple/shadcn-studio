import { parseDate } from "@internationalized/date";

import { ModalDatePicker } from "@/components/date-picker/date-picker";

export default function DatePickerDemo() {
  return (
    <ModalDatePicker
      defaultValue={parseDate("2026-10-21")}
      supportingText="Calendar picker"
      title="Select delivery date"
      triggerLabel="Open date picker"
    />
  );
}
