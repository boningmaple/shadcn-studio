import { createFileRoute } from "@tanstack/react-router";

import FABMenu01 from "@/material-3-ui/components/m3-fab-menu/demos/m3-fab-menu-01";
import FABMenu02 from "@/material-3-ui/components/m3-fab-menu/demos/m3-fab-menu-02";
import FABMenu03 from "@/material-3-ui/components/m3-fab-menu/demos/m3-fab-menu-03";
import FABMenu04 from "@/material-3-ui/components/m3-fab-menu/demos/m3-fab-menu-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-3-ui/components/fab-menu")({
  component: FABMenuComponentPage,
  head: () => ({
    meta: [
      {
        title: "FAB Menu Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 FAB menu patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function FABMenuComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="m3-fab-menu"
      description="Explore Material 3 floating action button menus for two to six related high-emphasis actions."
      exampleNoun="FAB menu"
      examples={fabMenuExamples}
      sectionId="fab-menu-patterns-title"
      sectionTitle="FAB Menu Patterns"
      title="FAB Menu"
    />
  );
}

const fabMenuExamples: ComponentExample[] = [
  {
    component: FABMenu01,
    id: "01",
    name: "Create FAB menu",
    wide: true,
  },
  {
    component: FABMenu02,
    id: "02",
    name: "Capture FAB menu",
    wide: true,
  },
  {
    component: FABMenu03,
    id: "03",
    name: "FAB menu with disabled item",
    wide: true,
  },
  {
    component: FABMenu04,
    id: "04",
    name: "FAB menu with custom trigger",
    wide: true,
  },
];
