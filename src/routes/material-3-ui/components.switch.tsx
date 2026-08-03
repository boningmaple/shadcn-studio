import { createFileRoute } from "@tanstack/react-router";

import Switch01 from "@/material-3-ui/components/m3-switch/demos/m3-switch-01";
import Switch02 from "@/material-3-ui/components/m3-switch/demos/m3-switch-02";
import Switch03 from "@/material-3-ui/components/m3-switch/demos/m3-switch-03";
import Switch04 from "@/material-3-ui/components/m3-switch/demos/m3-switch-04";
import Switch05 from "@/material-3-ui/components/m3-switch/demos/m3-switch-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-3-ui/components/switch")({
  component: SwitchComponentPage,
  head: () => ({
    meta: [
      {
        title: "Switch Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 switch patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SwitchComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="m3-switch"
      description="Explore Material 3 switches for toggling a single setting on or off."
      exampleNoun="switch"
      examples={switchExamples}
      sectionId="switch-patterns-title"
      sectionTitle="Switch Patterns"
      title="Switch"
    />
  );
}

const switchExamples: ComponentExample[] = [
  {
    component: Switch01,
    id: "01",
    name: "Switch states",
    wide: true,
  },
  {
    component: Switch02,
    id: "02",
    name: "Switch list",
    wide: true,
  },
  {
    component: Switch03,
    id: "03",
    name: "Controlled switch",
    wide: true,
  },
  {
    component: Switch04,
    id: "04",
    name: "Disabled and read-only switches",
    wide: true,
  },
  {
    component: Switch05,
    id: "05",
    name: "Switches with icons and descriptions",
    wide: true,
  },
];
