import { createFileRoute } from "@tanstack/react-router";

import Tooltip01 from "@/ui/material-design/components/md-tooltip/demos/md-tooltip-01";
import Tooltip02 from "@/ui/material-design/components/md-tooltip/demos/md-tooltip-02";
import Tooltip03 from "@/ui/material-design/components/md-tooltip/demos/md-tooltip-03";
import Tooltip04 from "@/ui/material-design/components/md-tooltip/demos/md-tooltip-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/tooltip")({
  component: TooltipComponentPage,
  head: () => ({
    meta: [
      {
        title: "Tooltip Components | VibeUI",
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
  return <ComponentDemosPage demoComponents={demoComponents} slug="tooltip" />;
}

const demoComponents: DemoComponents<"tooltip"> = {
  "01": Tooltip01,
  "02": Tooltip02,
  "03": Tooltip03,
  "04": Tooltip04,
};
