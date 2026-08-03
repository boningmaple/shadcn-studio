import { parseDate } from "@internationalized/date";

import { M3ModalDateInput } from "@/material-3-ui/components/m3-date-picker/m3-date-picker";

export default function M3DatePickerDemo() {
  return (
    <M3ModalDateInput
      defaultValue={parseDate("1990-04-18")}
      description="Enter month, day, and year."
      label="Birthday"
      supportingText="Manual entry"
      title="Enter birthday"
      triggerLabel="Open date input"
    />
  );
}
