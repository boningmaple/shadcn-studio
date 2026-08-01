import { createFileRoute } from "@tanstack/react-router";

import Switch01 from "@/demos/components/switch/switch-01";
import Switch02 from "@/demos/components/switch/switch-02";
import Switch03 from "@/demos/components/switch/switch-03";
import Switch04 from "@/demos/components/switch/switch-04";
import Switch05 from "@/demos/components/switch/switch-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/switch")({
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
      codeArtifactPrefix="switch"
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
