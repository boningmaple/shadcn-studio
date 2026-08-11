import { createFileRoute } from "@tanstack/react-router";

import Snackbar01 from "@/ui/material-design/components/md-snackbar/demos/md-snackbar-01";
import Snackbar02 from "@/ui/material-design/components/md-snackbar/demos/md-snackbar-02";
import Snackbar03 from "@/ui/material-design/components/md-snackbar/demos/md-snackbar-03";
import Snackbar04 from "@/ui/material-design/components/md-snackbar/demos/md-snackbar-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/snackbar")({
  component: SnackbarComponentPage,
  head: () => ({
    meta: [
      {
        title: "Snackbar Components | VibeUI",
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
  return <ComponentDemosPage demoComponents={demoComponents} slug="snackbar" />;
}

const demoComponents: DemoComponents<"snackbar"> = {
  "01": Snackbar01,
  "02": Snackbar02,
  "03": Snackbar03,
  "04": Snackbar04,
};
