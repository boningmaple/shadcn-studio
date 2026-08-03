import { Time } from "@internationalized/date";

import { M3ModalTimePickerInput } from "@/material-3-ui/components/m3-time-picker/m3-time-picker";

export default function M3TimePickerDemo() {
  return (
    <M3ModalTimePickerInput
      defaultValue={new Time(14, 20)}
      description="Confirm the pickup window."
      label="Pickup time"
      supportingText="Manual entry"
      title="Enter pickup time"
      triggerLabel="Open time input"
    />
  );
}
