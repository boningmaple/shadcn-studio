import { createFileRoute } from "@tanstack/react-router";

import TimePicker01 from "@/ui/material-design/components/md-time-picker/demos/md-time-picker-01";
import TimePicker02 from "@/ui/material-design/components/md-time-picker/demos/md-time-picker-02";
import TimePicker03 from "@/ui/material-design/components/md-time-picker/demos/md-time-picker-03";
import TimePicker04 from "@/ui/material-design/components/md-time-picker/demos/md-time-picker-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

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
    <ComponentExamplesPage
      codeArtifactPrefix="md-time-picker"
      description="Explore Material 3 input time pickers with segmented keyboard editing, validation states, and a modal input flow."
      exampleNoun="time picker"
      examples={timePickerExamples}
      sectionId="time-picker-patterns-title"
      sectionTitle="Time Picker Patterns"
      title="Time Picker"
    />
  );
}

const timePickerExamples: ComponentExample[] = [
  {
    component: TimePicker01,
    id: "01",
    name: "Input time picker",
  },
  {
    component: TimePicker02,
    id: "02",
    name: "24-hour time with seconds",
  },
  {
    component: TimePicker03,
    id: "03",
    name: "Disabled and invalid states",
  },
  {
    component: TimePicker04,
    id: "04",
    name: "Modal time input",
  },
];
