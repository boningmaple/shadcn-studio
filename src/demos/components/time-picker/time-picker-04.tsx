import { Time } from "@internationalized/date";

import { ModalTimePickerInput } from "@/components/time-picker/time-picker";

export default function TimePickerDemo() {
  return (
    <ModalTimePickerInput
      defaultValue={new Time(14, 20)}
      description="Confirm the pickup window."
      label="Pickup time"
      supportingText="Manual entry"
      title="Enter pickup time"
      triggerLabel="Open time input"
    />
  );
}
