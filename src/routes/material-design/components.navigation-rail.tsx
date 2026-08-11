import { createFileRoute } from "@tanstack/react-router";

import NavigationRail01 from "@/ui/material-design/components/md-navigation-rail/demos/md-navigation-rail-01";
import NavigationRail02 from "@/ui/material-design/components/md-navigation-rail/demos/md-navigation-rail-02";
import NavigationRail03 from "@/ui/material-design/components/md-navigation-rail/demos/md-navigation-rail-03";
import NavigationRail04 from "@/ui/material-design/components/md-navigation-rail/demos/md-navigation-rail-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute(
  "/material-design/components/navigation-rail",
)({
  component: NavigationRailComponentPage,
  head: () => ({
    meta: [
      {
        title: "Navigation Rail Components | Shadcn Studio",
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
  return (
    <ComponentDemosPage
      demoComponents={demoComponents}
      slug="navigation-rail"
    />
  );
}

const demoComponents: DemoComponents<"navigation-rail"> = {
  "01": NavigationRail01,
  "02": NavigationRail02,
  "03": NavigationRail03,
  "04": NavigationRail04,
};
