import { createFileRoute } from "@tanstack/react-router";

import Tooltip01 from "@/ui/material-design/components/md-tooltip/demos/md-tooltip-01";
import Tooltip02 from "@/ui/material-design/components/md-tooltip/demos/md-tooltip-02";
import Tooltip03 from "@/ui/material-design/components/md-tooltip/demos/md-tooltip-03";
import Tooltip04 from "@/ui/material-design/components/md-tooltip/demos/md-tooltip-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-design/components/tooltip")({
  component: TooltipComponentPage,
  head: () => ({
    meta: [
      {
        title: "Tooltip Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 plain and rich tooltip patterns built with React Aria and Tailwind CSS.",
      },
    ],
  }),
});

function TooltipComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-tooltip"
      description="Explore Material 3 plain labels and rich contextual tooltips for icon-only controls, actions, and help affordances."
      exampleNoun="tooltip"
      examples={tooltipExamples}
      sectionId="tooltip-patterns-title"
      sectionTitle="Tooltip Patterns"
      title="Tooltip"
    />
  );
}

const tooltipExamples: ComponentExample[] = [
  {
    component: Tooltip01,
    id: "01",
    name: "Plain icon tooltips",
  },
  {
    component: Tooltip02,
    id: "02",
    name: "Tooltip placements",
  },
  {
    component: Tooltip03,
    id: "03",
    name: "Rich tooltip with action",
  },
  {
    component: Tooltip04,
    id: "04",
    name: "Mixed tooltip controls",
    wide: true,
  },
];
