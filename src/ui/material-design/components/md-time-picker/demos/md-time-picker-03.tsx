import { Time } from "@internationalized/date";

import { MDTimePickerInput } from "@/ui/material-design/components/md-time-picker/md-time-picker";

export default function MDTimePickerDemo() {
  return (
    <div className="grid w-full max-w-sm gap-4">
      <MDTimePickerInput
        defaultValue={new Time(7, 15)}
        isDisabled
        label="Quiet hours"
      />
      <MDTimePickerInput
        defaultValue={new Time(23, 50)}
        errorMessage="Choose a time before 10:00 PM."
        isInvalid
        label="Reminder time"
      />
    </div>
  );
}
