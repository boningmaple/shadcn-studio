import { createFileRoute } from "@tanstack/react-router";

import RadioButton01 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-01";
import RadioButton02 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-02";
import RadioButton03 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-03";
import RadioButton04 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-04";
import RadioButton05 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

export const Route = createFileRoute(
  "/material-design/components/radio-button",
)({
  component: RadioButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Radio Button Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 radio button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function RadioButtonComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-radio-button"
      description="Explore Material 3 radio buttons and radio groups for selecting a single option from a set."
      exampleNoun="radio button"
      examples={radioButtonExamples}
      sectionId="radio-button-patterns-title"
      sectionTitle="Radio Button Patterns"
      title="Radio Button"
    />
  );
}

const radioButtonExamples: ComponentExample[] = [
  {
    component: RadioButton01,
    id: "01",
    name: "Radio button states",
    wide: true,
  },
  {
    component: RadioButton02,
    id: "02",
    name: "Radio group",
    wide: true,
  },
  {
    component: RadioButton03,
    id: "03",
    name: "Required radio group",
    wide: true,
  },
  {
    component: RadioButton04,
    id: "04",
    name: "Disabled and read-only radio groups",
    wide: true,
  },
  {
    component: RadioButton05,
    id: "05",
    name: "Controlled radio group",
    wide: true,
  },
];
