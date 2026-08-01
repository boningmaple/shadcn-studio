import { createFileRoute } from "@tanstack/react-router";

import BottomSheet01 from "@/demos/components/bottom-sheet/bottom-sheet-01";
import BottomSheet02 from "@/demos/components/bottom-sheet/bottom-sheet-02";
import BottomSheet03 from "@/demos/components/bottom-sheet/bottom-sheet-03";
import BottomSheet04 from "@/demos/components/bottom-sheet/bottom-sheet-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/bottom-sheet")({
  component: BottomSheetComponentPage,
  head: () => ({
    meta: [
      {
        title: "Bottom Sheet Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Material bottom sheet patterns built with Base UI Drawer, React, and Tailwind CSS.",
      },
    ],
  }),
});

function BottomSheetComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="bottom-sheet"
      description="Explore modal, standard, snapping, and settings bottom sheets for supplementary workflows."
      exampleNoun="bottom sheet"
      examples={bottomSheetExamples}
      sectionId="bottom-sheet-patterns-title"
      sectionTitle="Bottom Sheet Patterns"
      title="Bottom Sheet"
    />
  );
}

const bottomSheetExamples: ComponentExample[] = [
  {
    component: BottomSheet01,
    id: "01",
    name: "Modal bottom sheet",
  },
  {
    component: BottomSheet02,
    id: "02",
    name: "Standard bottom sheet",
  },
  {
    component: BottomSheet03,
    id: "03",
    name: "Snapping bottom sheet",
  },
  {
    component: BottomSheet04,
    id: "04",
    name: "Settings bottom sheet",
  },
];
