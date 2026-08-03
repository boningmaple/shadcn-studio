import { createFileRoute } from "@tanstack/react-router";

import TextField01 from "@/ui/material-design/components/md-text-field/demos/md-text-field-01";
import TextField02 from "@/ui/material-design/components/md-text-field/demos/md-text-field-02";
import TextField03 from "@/ui/material-design/components/md-text-field/demos/md-text-field-03";
import TextField04 from "@/ui/material-design/components/md-text-field/demos/md-text-field-04";
import TextField05 from "@/ui/material-design/components/md-text-field/demos/md-text-field-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-design/components/text-field")({
  component: TextFieldComponentPage,
  head: () => ({
    meta: [
      {
        title: "Text Field Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 text field and text area patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function TextFieldComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-text-field"
      description="Explore Material 3 text fields and text areas for collecting user input."
      exampleNoun="text field"
      examples={textFieldExamples}
      sectionId="text-field-patterns-title"
      sectionTitle="Text Field Patterns"
      title="Text Field"
    />
  );
}

const textFieldExamples: ComponentExample[] = [
  {
    component: TextField01,
    id: "01",
    name: "Filled text fields",
    wide: true,
  },
  {
    component: TextField02,
    id: "02",
    name: "Outlined text fields",
    wide: true,
  },
  {
    component: TextField03,
    id: "03",
    name: "Text fields with icons",
    wide: true,
  },
  {
    component: TextField04,
    id: "04",
    name: "Text areas",
    wide: true,
  },
  {
    component: TextField05,
    id: "05",
    name: "Text field form",
    wide: true,
  },
];
