import { Time } from "@internationalized/date";

import { M3TimePickerInput } from "@/material-3-ui/components/m3-time-picker/m3-time-picker";

export default function M3TimePickerDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <M3TimePickerInput
        defaultValue={new Time(7, 15)}
        isDisabled
        label="Quiet hours"
      />
      <M3TimePickerInput
        defaultValue={new Time(23, 50)}
        errorMessage="Choose a time before 10:00 PM."
        isInvalid
        label="Reminder time"
      />
    </div>
  );
}
