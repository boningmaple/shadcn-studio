import { createFileRoute } from "@tanstack/react-router";

import TimePicker01 from "@/ui/material-design/components/md-time-picker/demos/md-time-picker-01";
import TimePicker02 from "@/ui/material-design/components/md-time-picker/demos/md-time-picker-02";
import TimePicker03 from "@/ui/material-design/components/md-time-picker/demos/md-time-picker-03";
import TimePicker04 from "@/ui/material-design/components/md-time-picker/demos/md-time-picker-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/time-picker")(
  {
    component: TimePickerComponentPage,
    head: () => ({
      meta: [
        {
          title: "Time Picker Components | Shadcn Studio",
        },
        {
          name: "description",
          content:
            "Accessible Material 3 input time picker patterns built with React Aria, React, and Tailwind CSS.",
        },
      ],
    }),
  },
);

function TimePickerComponentPage() {
  return (
    <ComponentDemosPage demoComponents={demoComponents} slug="time-picker" />
  );
}

const demoComponents: DemoComponents<"time-picker"> = {
  "01": TimePicker01,
  "02": TimePicker02,
  "03": TimePicker03,
  "04": TimePicker04,
};
