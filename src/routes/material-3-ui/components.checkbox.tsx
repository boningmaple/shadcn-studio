import { createFileRoute } from "@tanstack/react-router";

import Checkbox01 from "@/material-3-ui/components/m3-checkbox/demos/m3-checkbox-01";
import Checkbox02 from "@/material-3-ui/components/m3-checkbox/demos/m3-checkbox-02";
import Checkbox03 from "@/material-3-ui/components/m3-checkbox/demos/m3-checkbox-03";
import Checkbox04 from "@/material-3-ui/components/m3-checkbox/demos/m3-checkbox-04";
import Checkbox05 from "@/material-3-ui/components/m3-checkbox/demos/m3-checkbox-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-3-ui/components/checkbox")({
  component: CheckboxComponentPage,
  head: () => ({
    meta: [
      {
        title: "Checkbox Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 checkbox patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function CheckboxComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="m3-checkbox"
      description="Explore Material 3 checkboxes and checkbox groups for selecting multiple options."
      exampleNoun="checkbox"
      examples={checkboxExamples}
      sectionId="checkbox-patterns-title"
      sectionTitle="Checkbox Patterns"
      title="Checkbox"
    />
  );
}

const checkboxExamples: ComponentExample[] = [
  {
    component: Checkbox01,
    id: "01",
    name: "Checkbox states",
    wide: true,
  },
  {
    component: Checkbox02,
    id: "02",
    name: "Checkbox group",
    wide: true,
  },
  {
    component: Checkbox03,
    id: "03",
    name: "Indeterminate parent checkbox",
    wide: true,
  },
  {
    component: Checkbox04,
    id: "04",
    name: "Required checkbox group",
    wide: true,
  },
  {
    component: Checkbox05,
    id: "05",
    name: "Disabled and read-only checkboxes",
    wide: true,
  },
];
