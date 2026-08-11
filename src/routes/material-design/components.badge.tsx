import { createFileRoute } from "@tanstack/react-router";

import Badge01 from "@/ui/material-design/components/md-badge/demos/md-badge-01";
import Badge02 from "@/ui/material-design/components/md-badge/demos/md-badge-02";
import Badge03 from "@/ui/material-design/components/md-badge/demos/md-badge-03";
import Badge04 from "@/ui/material-design/components/md-badge/demos/md-badge-04";
import Badge05 from "@/ui/material-design/components/md-badge/demos/md-badge-05";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/badge")({
  component: BadgeComponentPage,
  head: () => ({
    meta: [
      {
        title: "Badge Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 badge patterns built with React and Tailwind CSS.",
      },
    ],
  }),
});

function BadgeComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="badge" />;
}

const demoComponents: DemoComponents<"badge"> = {
  "01": Badge01,
  "02": Badge02,
  "03": Badge03,
  "04": Badge04,
  "05": Badge05,
};
