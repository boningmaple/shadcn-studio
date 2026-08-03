import { createFileRoute } from "@tanstack/react-router";

import ExtendedFAB01 from "@/ui/material-design/components/md-extended-fab/demos/md-extended-fab-01";
import ExtendedFAB02 from "@/ui/material-design/components/md-extended-fab/demos/md-extended-fab-02";
import ExtendedFAB03 from "@/ui/material-design/components/md-extended-fab/demos/md-extended-fab-03";
import ExtendedFAB04 from "@/ui/material-design/components/md-extended-fab/demos/md-extended-fab-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute(
  "/material-design/components/extended-fab",
)({
  component: ExtendedFABComponentPage,
  head: () => ({
    meta: [
      {
        title: "Extended FAB Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 extended floating action button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ExtendedFABComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-extended-fab"
      description="Explore Material 3 extended floating action buttons for high-emphasis primary actions with labels, icons, colors, and lowered elevation."
      exampleNoun="extended FAB"
      examples={extendedFABExamples}
      sectionId="extended-fab-patterns-title"
      sectionTitle="Extended FAB Patterns"
      title="Extended FAB"
    />
  );
}

const extendedFABExamples: ComponentExample[] = [
  {
    component: ExtendedFAB01,
    id: "01",
    name: "Extended FAB color variants",
    wide: true,
  },
  {
    component: ExtendedFAB02,
    id: "02",
    name: "Extended FAB with and without icons",
    wide: true,
  },
  {
    component: ExtendedFAB03,
    id: "03",
    name: "Default and lowered elevation",
    wide: true,
  },
  {
    component: ExtendedFAB04,
    id: "04",
    name: "Extended FAB states",
    wide: true,
  },
];
