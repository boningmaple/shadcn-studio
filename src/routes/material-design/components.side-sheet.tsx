import { createFileRoute } from "@tanstack/react-router";

import SideSheet01 from "@/ui/material-design/components/md-side-sheet/demos/md-side-sheet-01";
import SideSheet02 from "@/ui/material-design/components/md-side-sheet/demos/md-side-sheet-02";
import SideSheet03 from "@/ui/material-design/components/md-side-sheet/demos/md-side-sheet-03";
import SideSheet04 from "@/ui/material-design/components/md-side-sheet/demos/md-side-sheet-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-design/components/side-sheet")({
  component: SideSheetComponentPage,
  head: () => ({
    meta: [
      {
        title: "Side Sheet Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Material side sheet patterns built with shadcn Sheet and Sidebar primitives, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SideSheetComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-side-sheet"
      description="Explore standard and modal side sheets for supplemental details, navigation, and focused actions."
      exampleNoun="side sheet"
      examples={sideSheetExamples}
      sectionId="side-sheet-patterns-title"
      sectionTitle="Side Sheet Patterns"
      title="Side Sheet"
    />
  );
}

const sideSheetExamples: ComponentExample[] = [
  {
    component: SideSheet01,
    id: "01",
    name: "Standard side sheet",
    wide: true,
  },
  {
    component: SideSheet02,
    id: "02",
    name: "Modal side sheet",
  },
  {
    component: SideSheet03,
    id: "03",
    name: "Left side sheet",
  },
  {
    component: SideSheet04,
    id: "04",
    name: "Side sheet with actions",
  },
];
