import { Time } from "@internationalized/date";

import { TimePickerInput } from "@/components/time-picker/time-picker";

export default function TimePickerDemo() {
  return (
    <div className="w-full max-w-sm">
      <TimePickerInput
        defaultValue={new Time(9, 30)}
        description="Use arrow keys to adjust each segment."
        label="Meeting time"
      />
    </div>
  );
}
