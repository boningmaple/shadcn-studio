import { createFileRoute } from "@tanstack/react-router";

import NavigationRail01 from "@/ui/material-design/components/md-navigation-rail/demos/md-navigation-rail-01";
import NavigationRail02 from "@/ui/material-design/components/md-navigation-rail/demos/md-navigation-rail-02";
import NavigationRail03 from "@/ui/material-design/components/md-navigation-rail/demos/md-navigation-rail-03";
import NavigationRail04 from "@/ui/material-design/components/md-navigation-rail/demos/md-navigation-rail-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

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
    <ComponentExamplesPage
      codeArtifactPrefix="md-navigation-rail"
      description="Explore Material navigation rails with optional FABs, badges, label modes, and adaptive layouts."
      exampleNoun="navigation rail"
      examples={navigationRailExamples}
      sectionId="navigation-rail-patterns-title"
      sectionTitle="Navigation Rail Patterns"
      title="Navigation Rail"
    />
  );
}

const navigationRailExamples: ComponentExample[] = [
  {
    component: NavigationRail01,
    id: "01",
    name: "Rail with FAB",
  },
  {
    component: NavigationRail02,
    id: "02",
    name: "Centered rail with badges",
  },
  {
    component: NavigationRail03,
    id: "03",
    name: "Persistent labels",
  },
  {
    component: NavigationRail04,
    id: "04",
    name: "Rail in layout",
    wide: true,
  },
];
