import { createFileRoute } from "@tanstack/react-router";

import AppBar01 from "@/ui/material-design/components/md-app-bar/demos/md-app-bar-01";
import AppBar02 from "@/ui/material-design/components/md-app-bar/demos/md-app-bar-02";
import AppBar03 from "@/ui/material-design/components/md-app-bar/demos/md-app-bar-03";
import AppBar04 from "@/ui/material-design/components/md-app-bar/demos/md-app-bar-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

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
