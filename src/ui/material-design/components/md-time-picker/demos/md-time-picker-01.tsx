import { Time } from "@internationalized/date";

import { MDTimePickerInput } from "@/ui/material-design/components/md-time-picker/md-time-picker";

export default function MDTimePickerDemo() {
  return (
    <div className="w-full max-w-sm">
      <MDTimePickerInput
        defaultValue={new Time(9, 30)}
        description="Use arrow keys to adjust each segment."
        label="Meeting time"
      />
    </div>
  );
}
