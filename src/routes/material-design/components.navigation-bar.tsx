import { createFileRoute } from "@tanstack/react-router";

import NavigationBar01 from "@/ui/material-design/components/md-navigation-bar/demos/md-navigation-bar-01";
import NavigationBar02 from "@/ui/material-design/components/md-navigation-bar/demos/md-navigation-bar-02";
import NavigationBar03 from "@/ui/material-design/components/md-navigation-bar/demos/md-navigation-bar-03";
import NavigationBar04 from "@/ui/material-design/components/md-navigation-bar/demos/md-navigation-bar-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute(
  "/material-design/components/navigation-bar",
)({
  component: NavigationBarComponentPage,
  head: () => ({
    meta: [
      {
        title: "Navigation Bar Components | Shadcn Studio",
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
    <ComponentExamplesPage
      codeArtifactPrefix="md-navigation-bar"
      description="Explore Material 3 navigation bars with active indicators, labels, and destination badges."
      exampleNoun="navigation bar"
      examples={navigationBarExamples}
      sectionId="navigation-bar-patterns-title"
      sectionTitle="Navigation Bar Patterns"
      title="Navigation Bar"
    />
  );
}

const navigationBarExamples: ComponentExample[] = [
  {
    component: NavigationBar01,
    id: "01",
    name: "Three destinations",
    wide: true,
  },
  {
    component: NavigationBar02,
    id: "02",
    name: "Badged destinations",
    wide: true,
  },
  {
    component: NavigationBar03,
    id: "03",
    name: "Five destinations",
    wide: true,
  },
  {
    component: NavigationBar04,
    id: "04",
    name: "Navigation bar in layout",
    wide: true,
  },
];
