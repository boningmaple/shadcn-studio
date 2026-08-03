import { Time } from "@internationalized/date";

import { M3TimePickerInput } from "@/material-3-ui/components/m3-time-picker/m3-time-picker";

export default function M3TimePickerDemo() {
  return (
    <div className="w-full max-w-sm">
      <M3TimePickerInput
        defaultValue={new Time(18, 45, 30)}
        granularity="second"
        hourCycle={24}
        label="Dispatch time"
      />
    </div>
  );
}
