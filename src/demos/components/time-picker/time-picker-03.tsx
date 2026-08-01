import { Time } from "@internationalized/date";

import { TimePickerInput } from "@/components/time-picker/time-picker";

export default function TimePickerDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <TimePickerInput
        defaultValue={new Time(7, 15)}
        isDisabled
        label="Quiet hours"
      />
      <TimePickerInput
        defaultValue={new Time(23, 50)}
        errorMessage="Choose a time before 10:00 PM."
        isInvalid
        label="Reminder time"
      />
    </div>
  );
}
