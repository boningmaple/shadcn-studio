import { createFileRoute } from "@tanstack/react-router";

import LoadingIndicator01 from "@/demos/components/loading-indicator/loading-indicator-01";
import LoadingIndicator02 from "@/demos/components/loading-indicator/loading-indicator-02";
import LoadingIndicator03 from "@/demos/components/loading-indicator/loading-indicator-03";
import LoadingIndicator04 from "@/demos/components/loading-indicator/loading-indicator-04";
import LoadingIndicator05 from "@/demos/components/loading-indicator/loading-indicator-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/loading-indicator")({
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
      codeArtifactPrefix="loading-indicator"
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
