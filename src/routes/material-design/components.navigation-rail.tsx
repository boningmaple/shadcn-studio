import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import NavigationRail01 from "@/features/ui-material-design/components/md-navigation-rail/demos/md-navigation-rail-01";
import NavigationRail02 from "@/features/ui-material-design/components/md-navigation-rail/demos/md-navigation-rail-02";
import NavigationRail03 from "@/features/ui-material-design/components/md-navigation-rail/demos/md-navigation-rail-03";
import NavigationRail04 from "@/features/ui-material-design/components/md-navigation-rail/demos/md-navigation-rail-04";

export const Route = createFileRoute("/material-design/components/navigation-rail")({
  component: NavigationRailComponentPage,
  head: () => ({
    meta: [
      {
        title: "Navigation Rail Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Material navigation rail patterns built with shadcn Sidebar, React, and Tailwind CSS.",
      },
    ],
  }),
});

function NavigationRailComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="navigation-rail" />;
}

const demoComponents: DemoComponents<"navigation-rail"> = {
  "01": NavigationRail01,
  "02": NavigationRail02,
  "03": NavigationRail03,
  "04": NavigationRail04,
};
