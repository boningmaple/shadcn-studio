import { createFileRoute } from "@tanstack/react-router";

import SplitButton01 from "@/ui/material-design/components/md-split-button/demos/md-split-button-01";
import SplitButton02 from "@/ui/material-design/components/md-split-button/demos/md-split-button-02";
import SplitButton03 from "@/ui/material-design/components/md-split-button/demos/md-split-button-03";
import SplitButton04 from "@/ui/material-design/components/md-split-button/demos/md-split-button-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

export const Route = createFileRoute(
  "/material-design/components/split-button",
)({
  component: SplitButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Split Button Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 split button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SplitButtonComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-split-button"
      description="Explore Material 3 split buttons that pair a primary action with a menu of related alternatives."
      exampleNoun="split button"
      examples={splitButtonExamples}
      sectionId="split-button-patterns-title"
      sectionTitle="Split Button Patterns"
      title="Split Button"
    />
  );
}

const splitButtonExamples: ComponentExample[] = [
  {
    component: SplitButton01,
    id: "01",
    name: "Filled split button",
    wide: true,
  },
  {
    component: SplitButton02,
    id: "02",
    name: "Tonal and outlined split buttons",
    wide: true,
  },
  {
    component: SplitButton03,
    id: "03",
    name: "Split button sizes",
    wide: true,
  },
  {
    component: SplitButton04,
    id: "04",
    name: "Split button disabled states",
    wide: true,
  },
];
