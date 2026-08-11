import { createFileRoute } from "@tanstack/react-router";

import ProgressIndicator01 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-01";
import ProgressIndicator02 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-02";
import ProgressIndicator03 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-03";
import ProgressIndicator04 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-04";
import ProgressIndicator05 from "@/ui/material-design/components/md-progress-indicator/demos/md-progress-indicator-05";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

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
    <ComponentDemosPage
      demoComponents={demoComponents}
      slug="progress-indicator"
    />
  );
}

const demoComponents: DemoComponents<"progress-indicator"> = {
  "01": ProgressIndicator01,
  "02": ProgressIndicator02,
  "03": ProgressIndicator03,
  "04": ProgressIndicator04,
  "05": ProgressIndicator05,
};
