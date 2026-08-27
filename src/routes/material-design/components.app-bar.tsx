import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import AppBar01 from "@/features/ui-material-design/components/md-app-bar/demos/md-app-bar-01";
import AppBar02 from "@/features/ui-material-design/components/md-app-bar/demos/md-app-bar-02";
import AppBar03 from "@/features/ui-material-design/components/md-app-bar/demos/md-app-bar-03";
import AppBar04 from "@/features/ui-material-design/components/md-app-bar/demos/md-app-bar-04";

export const Route = createFileRoute("/material-design/components/app-bar")({
  component: AppBarComponentPage,
  head: () => ({
    meta: [
      {
        title: "App Bar Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Material app bar patterns built with Toolbar, SearchBar, Chips, React, and Tailwind CSS.",
      },
    ],
  }),
});

function AppBarComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="app-bar" />;
}

const demoComponents: DemoComponents<"app-bar"> = {
  "01": AppBar01,
  "02": AppBar02,
  "03": AppBar03,
  "04": AppBar04,
};
