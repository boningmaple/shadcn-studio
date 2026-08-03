import { createFileRoute } from "@tanstack/react-router";

import ToggleButton01 from "@/ui/material-design/components/md-toggle-button/demos/md-toggle-button-01";
import ToggleButton02 from "@/ui/material-design/components/md-toggle-button/demos/md-toggle-button-02";
import ToggleButton03 from "@/ui/material-design/components/md-toggle-button/demos/md-toggle-button-03";
import ToggleButton04 from "@/ui/material-design/components/md-toggle-button/demos/md-toggle-button-04";
import ToggleButton05 from "@/ui/material-design/components/md-toggle-button/demos/md-toggle-button-05";
import ToggleButton06 from "@/ui/material-design/components/md-toggle-button/demos/md-toggle-button-06";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute(
  "/material-design/components/toggle-button",
)({
  component: ToggleButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Toggle Button Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 toggle button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ToggleButtonComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-toggle-button"
      description="Explore Material 3 toggle button selection states, built with React Aria UI, React, and Tailwind CSS."
      exampleNoun="toggle button"
      examples={toggleButtonExamples}
      sectionId="toggle-button-states-title"
      sectionTitle="Toggle Button States"
      title="Toggle Button"
    />
  );
}

const toggleButtonExamples: ComponentExample[] = [
  {
    component: ToggleButton01,
    id: "01",
    name: "Material 3 variants",
    wide: true,
  },
  {
    component: ToggleButton02,
    id: "02",
    name: "Material 3 variants with icon",
    wide: true,
  },
  {
    component: ToggleButton03,
    id: "03",
    name: "Elevated toggle button states",
    wide: true,
  },
  {
    component: ToggleButton04,
    id: "04",
    name: "Filled toggle button states",
    wide: true,
  },
  {
    component: ToggleButton05,
    id: "05",
    name: "Tonal toggle button states",
    wide: true,
  },
  {
    component: ToggleButton06,
    id: "06",
    name: "Outlined toggle button states",
    wide: true,
  },
];
