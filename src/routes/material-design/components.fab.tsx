import { createFileRoute } from "@tanstack/react-router";

import FAB01 from "@/ui/material-design/components/md-fab/demos/md-fab-01";
import FAB02 from "@/ui/material-design/components/md-fab/demos/md-fab-02";
import FAB03 from "@/ui/material-design/components/md-fab/demos/md-fab-03";
import FAB04 from "@/ui/material-design/components/md-fab/demos/md-fab-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

export const Route = createFileRoute("/material-design/components/fab")({
  component: FABComponentPage,
  head: () => ({
    meta: [
      {
        title: "FAB Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 floating action button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function FABComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-fab"
      description="Explore Material 3 floating action buttons for high-emphasis icon actions with responsive sizes, colors, and elevation."
      exampleNoun="FAB"
      examples={fabExamples}
      sectionId="fab-patterns-title"
      sectionTitle="FAB Patterns"
      title="FAB"
    />
  );
}

const fabExamples: ComponentExample[] = [
  {
    component: FAB01,
    id: "01",
    name: "FAB sizes",
    wide: true,
  },
  {
    component: FAB02,
    id: "02",
    name: "FAB color variants",
    wide: true,
  },
  {
    component: FAB03,
    id: "03",
    name: "Default and lowered FABs",
    wide: true,
  },
  {
    component: FAB04,
    id: "04",
    name: "FAB states",
    wide: true,
  },
];
