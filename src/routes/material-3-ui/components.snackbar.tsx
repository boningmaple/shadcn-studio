import { createFileRoute } from "@tanstack/react-router";

import Snackbar01 from "@/material-3-ui/components/m3-snackbar/demos/m3-snackbar-01";
import Snackbar02 from "@/material-3-ui/components/m3-snackbar/demos/m3-snackbar-02";
import Snackbar03 from "@/material-3-ui/components/m3-snackbar/demos/m3-snackbar-03";
import Snackbar04 from "@/material-3-ui/components/m3-snackbar/demos/m3-snackbar-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-3-ui/components/snackbar")({
  component: SnackbarComponentPage,
  head: () => ({
    meta: [
      {
        title: "Snackbar Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 snackbar patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SnackbarComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="m3-snackbar"
      description="Explore Material 3 snackbars for temporary process feedback, optional actions, and dismissible notices."
      exampleNoun="snackbar"
      examples={snackbarExamples}
      sectionId="snackbar-patterns-title"
      sectionTitle="Snackbar Patterns"
      title="Snackbar"
    />
  );
}

const snackbarExamples: ComponentExample[] = [
  {
    component: Snackbar01,
    id: "01",
    name: "Basic snackbar",
  },
  {
    component: Snackbar02,
    id: "02",
    name: "Snackbar with action",
  },
  {
    component: Snackbar03,
    id: "03",
    name: "Dismissible snackbar",
  },
  {
    component: Snackbar04,
    id: "04",
    name: "Consecutive snackbars",
  },
];
