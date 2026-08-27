import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import DatePicker01 from "@/features/ui-material-design/components/md-date-picker/demos/md-date-picker-01";
import DatePicker02 from "@/features/ui-material-design/components/md-date-picker/demos/md-date-picker-02";
import DatePicker03 from "@/features/ui-material-design/components/md-date-picker/demos/md-date-picker-03";
import DatePicker04 from "@/features/ui-material-design/components/md-date-picker/demos/md-date-picker-04";

export const Route = createFileRoute("/material-design/components/date-picker")({
  component: DatePickerComponentPage,
  head: () => ({
    meta: [
      {
        title: "Date Picker Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 date picker patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function DatePickerComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="date-picker" />;
}

const demoComponents: DemoComponents<"date-picker"> = {
  "01": DatePicker01,
  "02": DatePicker02,
  "03": DatePicker03,
  "04": DatePicker04,
};
