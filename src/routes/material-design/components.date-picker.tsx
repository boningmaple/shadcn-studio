import { createFileRoute } from "@tanstack/react-router";

import DatePicker01 from "@/ui/material-design/components/md-date-picker/demos/md-date-picker-01";
import DatePicker02 from "@/ui/material-design/components/md-date-picker/demos/md-date-picker-02";
import DatePicker03 from "@/ui/material-design/components/md-date-picker/demos/md-date-picker-03";
import DatePicker04 from "@/ui/material-design/components/md-date-picker/demos/md-date-picker-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-design/components/date-picker")(
  {
    component: DatePickerComponentPage,
    head: () => ({
      meta: [
        {
          title: "Date Picker Components | Shadcn Studio",
        },
        {
          name: "description",
          content:
            "Accessible Material 3 date picker patterns built with React Aria, React, and Tailwind CSS.",
        },
      ],
    }),
  },
);

function DatePickerComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-date-picker"
      description="Explore Material 3 docked, range, modal calendar, and modal input date picker patterns."
      exampleNoun="date picker"
      examples={datePickerExamples}
      sectionId="date-picker-patterns-title"
      sectionTitle="Date Picker Patterns"
      title="Date Picker"
    />
  );
}

const datePickerExamples: ComponentExample[] = [
  {
    component: DatePicker01,
    id: "01",
    name: "Docked date picker",
  },
  {
    component: DatePicker02,
    id: "02",
    name: "Date range picker",
    wide: true,
  },
  {
    component: DatePicker03,
    id: "03",
    name: "Modal date picker",
  },
  {
    component: DatePicker04,
    id: "04",
    name: "Modal date input",
  },
];
