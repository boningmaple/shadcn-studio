import { createFileRoute } from "@tanstack/react-router";

import ProgressIndicator01 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-01";
import ProgressIndicator02 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-02";
import ProgressIndicator03 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-03";
import ProgressIndicator04 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-04";
import ProgressIndicator05 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute(
  "/material-design/components/progress-indicator",
)({
  component: ProgressIndicatorComponentPage,
  head: () => ({
    meta: [
      {
        title: "Progress Indicator Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 progress indicator patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ProgressIndicatorComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-progress-indicator"
      description="Explore Material 3 linear and circular progress indicators for determinate and indeterminate operations."
      exampleNoun="progress indicator"
      examples={progressIndicatorExamples}
      sectionId="progress-indicator-patterns-title"
      sectionTitle="Progress Indicator Patterns"
      title="Progress Indicator"
    />
  );
}

const progressIndicatorExamples: ComponentExample[] = [
  {
    component: ProgressIndicator01,
    id: "01",
    name: "Linear progress states",
    wide: true,
  },
  {
    component: ProgressIndicator02,
    id: "02",
    name: "Animated linear progress",
    wide: true,
  },
  {
    component: ProgressIndicator03,
    id: "03",
    name: "Determinate progress",
    wide: true,
  },
  {
    component: ProgressIndicator04,
    id: "04",
    name: "Indeterminate progress",
    wide: true,
  },
  {
    component: ProgressIndicator05,
    id: "05",
    name: "Circular progress values",
    wide: true,
  },
];
