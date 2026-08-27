import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import NavigationBar01 from "@/features/ui-material-design/components/md-navigation-bar/demos/md-navigation-bar-01";
import NavigationBar02 from "@/features/ui-material-design/components/md-navigation-bar/demos/md-navigation-bar-02";
import NavigationBar03 from "@/features/ui-material-design/components/md-navigation-bar/demos/md-navigation-bar-03";
import NavigationBar04 from "@/features/ui-material-design/components/md-navigation-bar/demos/md-navigation-bar-04";

export const Route = createFileRoute("/material-design/components/navigation-bar")({
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
  return <ComponentDemosPage demoComponents={demoComponents} slug="navigation-bar" />;
}

const demoComponents: DemoComponents<"navigation-bar"> = {
  "01": NavigationBar01,
  "02": NavigationBar02,
  "03": NavigationBar03,
  "04": NavigationBar04,
};
