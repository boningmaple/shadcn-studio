import { createFileRoute } from "@tanstack/react-router";

import FAB01 from "@/ui/material-design/components/md-fab/demos/md-fab-01";
import FAB02 from "@/ui/material-design/components/md-fab/demos/md-fab-02";
import FAB03 from "@/ui/material-design/components/md-fab/demos/md-fab-03";
import FAB04 from "@/ui/material-design/components/md-fab/demos/md-fab-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/fab")({
  component: FABComponentPage,
  head: () => ({
    meta: [
      {
        title: "FAB Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 floating action button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function FABComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="fab" />;
}

const demoComponents: DemoComponents<"fab"> = {
  "01": FAB01,
  "02": FAB02,
  "03": FAB03,
  "04": FAB04,
};
