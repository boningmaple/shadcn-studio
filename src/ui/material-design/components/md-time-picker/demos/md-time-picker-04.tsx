import { Time } from "@internationalized/date";

import { MDModalTimePickerInput } from "@/ui/material-design/components/md-time-picker/md-time-picker";

export default function MDTimePickerDemo() {
  return (
    <MDModalTimePickerInput
      defaultValue={new Time(14, 20)}
      description="Confirm the pickup window."
      label="Pickup time"
      supportingText="Manual entry"
      title="Enter pickup time"
      triggerLabel="Open time input"
    />
  );
}
