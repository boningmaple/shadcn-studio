import { parseDate } from "@internationalized/date";

import { ModalDateInput } from "@/components/date-picker/date-picker";

export default function DatePickerDemo() {
  return (
    <ModalDateInput
      defaultValue={parseDate("1990-04-18")}
      description="Enter month, day, and year."
      label="Birthday"
      supportingText="Manual entry"
      title="Enter birthday"
      triggerLabel="Open date input"
    />
  );
}
