import { createFileRoute } from "@tanstack/react-router";

import LoadingIndicator01 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-01";
import LoadingIndicator02 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-02";
import LoadingIndicator03 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-03";
import LoadingIndicator04 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-04";
import LoadingIndicator05 from "@/ui/material-design/components/md-loading-indicator/demos/md-loading-indicator-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

export const Route = createFileRoute(
  "/material-design/components/loading-indicator",
)({
  component: LoadingIndicatorComponentPage,
  head: () => ({
    meta: [
      {
        title: "Loading Indicator Components | Shadcn Studio",
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
    <ComponentExamplesPage
      codeArtifactPrefix="md-loading-indicator"
      description="Explore Material 3 loading indicators for communicating an ongoing operation with plain, tonal, surface, and inverse treatments."
      exampleNoun="loading indicator"
      examples={loadingIndicatorExamples}
      sectionId="loading-indicator-patterns-title"
      sectionTitle="Loading Indicator Patterns"
      title="Loading Indicator"
    />
  );
}

const loadingIndicatorExamples: ComponentExample[] = [
  {
    component: LoadingIndicator01,
    id: "01",
    name: "Loading indicator sizes",
    wide: true,
  },
  {
    component: LoadingIndicator02,
    id: "02",
    name: "Loading indicators with labels",
    wide: true,
  },
  {
    component: LoadingIndicator03,
    id: "03",
    name: "Loading state in buttons",
    wide: true,
  },
  {
    component: LoadingIndicator04,
    id: "04",
    name: "Loading state in a container",
    wide: true,
  },
  {
    component: LoadingIndicator05,
    id: "05",
    name: "Full-area loading state",
    wide: true,
  },
];
