import { createFileRoute } from "@tanstack/react-router";

import ButtonGroup01 from "@/material-3-ui/components/m3-button-group/demos/m3-button-group-01";
import ButtonGroup02 from "@/material-3-ui/components/m3-button-group/demos/m3-button-group-02";
import ButtonGroup03 from "@/material-3-ui/components/m3-button-group/demos/m3-button-group-03";
import ButtonGroup04 from "@/material-3-ui/components/m3-button-group/demos/m3-button-group-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-3-ui/components/button-group")({
  component: ButtonGroupComponentPage,
  head: () => ({
    meta: [
      {
        title: "Button Group Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 button group patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ButtonGroupComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="m3-button-group"
      description="Explore Material 3 action and toggle button groups with React Aria toolbar and toggle selection behavior."
      exampleNoun="button group"
      examples={buttonGroupExamples}
      sectionId="button-group-patterns-title"
      sectionTitle="Button Group Patterns"
      title="Button Group"
    />
  );
}

const buttonGroupExamples: ComponentExample[] = [
  {
    component: ButtonGroup01,
    id: "01",
    name: "Related action buttons",
    wide: true,
  },
  {
    component: ButtonGroup02,
    id: "02",
    name: "Icon button group",
    wide: true,
  },
  {
    component: ButtonGroup03,
    id: "03",
    name: "Single-select toggle group",
    wide: true,
  },
  {
    component: ButtonGroup04,
    id: "04",
    name: "Multi-select icon toggle group",
    wide: true,
  },
];
