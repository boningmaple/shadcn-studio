import { createFileRoute } from "@tanstack/react-router";

import Divider01 from "@/ui/material-design/components/md-divider/demos/md-divider-01";
import Divider02 from "@/ui/material-design/components/md-divider/demos/md-divider-02";
import Divider03 from "@/ui/material-design/components/md-divider/demos/md-divider-03";
import Divider04 from "@/ui/material-design/components/md-divider/demos/md-divider-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

export const Route = createFileRoute("/material-design/components/divider")({
  component: DividerComponentPage,
  head: () => ({
    meta: [
      {
        title: "Divider Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 divider patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function DividerComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-divider"
      description="Explore Material 3 dividers for separating content in lists, layouts, and dense surfaces."
      exampleNoun="divider"
      examples={dividerExamples}
      sectionId="divider-patterns-title"
      sectionTitle="Divider Patterns"
      title="Divider"
    />
  );
}

const dividerExamples: ComponentExample[] = [
  {
    component: Divider01,
    id: "01",
    name: "Full-width dividers",
    wide: true,
  },
  {
    component: Divider02,
    id: "02",
    name: "Inset list dividers",
    wide: true,
  },
  {
    component: Divider03,
    id: "03",
    name: "Vertical dividers",
    wide: true,
  },
  {
    component: Divider04,
    id: "04",
    name: "Responsive dividers",
    wide: true,
  },
];
