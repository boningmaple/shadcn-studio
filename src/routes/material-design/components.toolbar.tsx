import { createFileRoute } from "@tanstack/react-router";

import Toolbar01 from "@/ui/material-design/components/md-toolbar/demos/md-toolbar-01";
import Toolbar02 from "@/ui/material-design/components/md-toolbar/demos/md-toolbar-02";
import Toolbar03 from "@/ui/material-design/components/md-toolbar/demos/md-toolbar-03";
import Toolbar04 from "@/ui/material-design/components/md-toolbar/demos/md-toolbar-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/toolbar")({
  component: ToolbarComponentPage,
  head: () => ({
    meta: [
      {
        title: "Toolbar Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material toolbar patterns built with React Aria Toolbar, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ToolbarComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="toolbar" />;
}

const demoComponents: DemoComponents<"toolbar"> = {
  "01": Toolbar01,
  "02": Toolbar02,
  "03": Toolbar03,
  "04": Toolbar04,
};
