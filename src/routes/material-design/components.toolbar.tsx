import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import Toolbar01 from "@/features/ui-material-design/components/md-toolbar/demos/md-toolbar-01";
import Toolbar02 from "@/features/ui-material-design/components/md-toolbar/demos/md-toolbar-02";
import Toolbar03 from "@/features/ui-material-design/components/md-toolbar/demos/md-toolbar-03";
import Toolbar04 from "@/features/ui-material-design/components/md-toolbar/demos/md-toolbar-04";

export const Route = createFileRoute("/material-design/components/toolbar")({
  component: ToolbarComponentPage,
  head: () => ({
    meta: [
      {
        title: "Toolbar Components | VibeUI",
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
