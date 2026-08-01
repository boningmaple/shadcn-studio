import { createFileRoute } from "@tanstack/react-router";

import SegmentedButton01 from "@/demos/components/segmented-button/segmented-button-01";
import SegmentedButton02 from "@/demos/components/segmented-button/segmented-button-02";
import SegmentedButton03 from "@/demos/components/segmented-button/segmented-button-03";
import SegmentedButton04 from "@/demos/components/segmented-button/segmented-button-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/segmented-button")({
  component: SegmentedButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Segmented Button Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 segmented button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SegmentedButtonComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="segmented-button"
      description="Explore Material 3 segmented buttons for switching views, sorting content, and choosing single or multiple related options."
      exampleNoun="segmented button"
      examples={segmentedButtonExamples}
      sectionId="segmented-button-patterns-title"
      sectionTitle="Segmented Button Patterns"
      title="Segmented Button"
    />
  );
}

const segmentedButtonExamples: ComponentExample[] = [
  {
    component: SegmentedButton01,
    id: "01",
    name: "Single-select text segments",
    wide: true,
  },
  {
    component: SegmentedButton02,
    id: "02",
    name: "Segments with icons",
    wide: true,
  },
  {
    component: SegmentedButton03,
    id: "03",
    name: "Multi-select icon segments",
    wide: true,
  },
  {
    component: SegmentedButton04,
    id: "04",
    name: "Compact and vertical segmented buttons",
    wide: true,
  },
];
