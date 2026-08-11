import { createFileRoute } from "@tanstack/react-router";

import LoadingIndicator01 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-01";
import LoadingIndicator02 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-02";
import LoadingIndicator03 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-03";
import LoadingIndicator04 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-04";
import LoadingIndicator05 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-05";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute(
  "/material-design/components/loading-indicator",
)({
  component: LoadingIndicatorComponentPage,
  head: () => ({
    meta: [
      {
        title: "Loading Indicator Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Material 3 loading indicator patterns built with the local Spinner, React, and Tailwind CSS.",
      },
    ],
  }),
});

function LoadingIndicatorComponentPage() {
  return (
    <ComponentDemosPage
      demoComponents={demoComponents}
      slug="loading-indicator"
    />
  );
}

const demoComponents: DemoComponents<"loading-indicator"> = {
  "01": LoadingIndicator01,
  "02": LoadingIndicator02,
  "03": LoadingIndicator03,
  "04": LoadingIndicator04,
  "05": LoadingIndicator05,
};
