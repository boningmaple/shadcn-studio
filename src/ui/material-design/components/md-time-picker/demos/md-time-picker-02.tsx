import { Time } from "@internationalized/date";

import { MDTimePickerInput } from "@/ui/material-design/components/md-time-picker/md-time-picker";

export default function MDTimePickerDemo() {
  return (
    <div className="w-full max-w-sm">
      <MDTimePickerInput
        defaultValue={new Time(18, 45, 30)}
        granularity="second"
        hourCycle={24}
        label="Dispatch time"
      />
    </div>
  );
}
