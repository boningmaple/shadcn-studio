import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import TimePicker01 from "@/features/ui-material-design/components/md-time-picker/demos/md-time-picker-01";
import TimePicker02 from "@/features/ui-material-design/components/md-time-picker/demos/md-time-picker-02";
import TimePicker03 from "@/features/ui-material-design/components/md-time-picker/demos/md-time-picker-03";
import TimePicker04 from "@/features/ui-material-design/components/md-time-picker/demos/md-time-picker-04";

export const Route = createFileRoute("/material-design/components/time-picker")({
  component: TimePickerComponentPage,
  head: () => ({
    meta: [
      {
        title: "Time Picker Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 input time picker patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function TimePickerComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="time-picker" />;
}

const demoComponents: DemoComponents<"time-picker"> = {
  "01": TimePicker01,
  "02": TimePicker02,
  "03": TimePicker03,
  "04": TimePicker04,
};
