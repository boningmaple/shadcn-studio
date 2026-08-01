import { Time } from "@internationalized/date";

import { TimePickerInput } from "@/components/time-picker/time-picker";

export default function TimePickerDemo() {
  return (
    <div className="w-full max-w-sm">
      <TimePickerInput
        defaultValue={new Time(18, 45, 30)}
        granularity="second"
        hourCycle={24}
        label="Dispatch time"
      />
    </div>
  );
}
