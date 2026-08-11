import { createFileRoute } from "@tanstack/react-router";

import NavigationBar01 from "@/ui/material-design/components/md-navigation-bar/demos/md-navigation-bar-01";
import NavigationBar02 from "@/ui/material-design/components/md-navigation-bar/demos/md-navigation-bar-02";
import NavigationBar03 from "@/ui/material-design/components/md-navigation-bar/demos/md-navigation-bar-03";
import NavigationBar04 from "@/ui/material-design/components/md-navigation-bar/demos/md-navigation-bar-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute(
  "/material-design/components/navigation-bar",
)({
  component: NavigationBarComponentPage,
  head: () => ({
    meta: [
      {
        title: "Navigation Bar Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 navigation bar patterns built with React Aria Link, React, and Tailwind CSS.",
      },
    ],
  }),
});

function NavigationBarComponentPage() {
  return (
    <ComponentDemosPage demoComponents={demoComponents} slug="navigation-bar" />
  );
}

const demoComponents: DemoComponents<"navigation-bar"> = {
  "01": NavigationBar01,
  "02": NavigationBar02,
  "03": NavigationBar03,
  "04": NavigationBar04,
};
