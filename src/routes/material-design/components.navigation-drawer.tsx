import { createFileRoute } from "@tanstack/react-router";

import NavigationDrawer01 from "@/ui/material-design/components/md-navigation-drawer/demos/md-navigation-drawer-01";
import NavigationDrawer02 from "@/ui/material-design/components/md-navigation-drawer/demos/md-navigation-drawer-02";
import NavigationDrawer03 from "@/ui/material-design/components/md-navigation-drawer/demos/md-navigation-drawer-03";
import NavigationDrawer04 from "@/ui/material-design/components/md-navigation-drawer/demos/md-navigation-drawer-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

export const Route = createFileRoute(
  "/material-design/components/navigation-drawer",
)({
  component: NavigationDrawerComponentPage,
  head: () => ({
    meta: [
      {
        title: "Navigation Drawer Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Material navigation drawer patterns built with shadcn Sidebar, Sheet, React, and Tailwind CSS.",
      },
    ],
  }),
});

function NavigationDrawerComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-navigation-drawer"
      description="Explore Material navigation drawers with standard, modal, grouped, and account-header layouts."
      exampleNoun="navigation drawer"
      examples={navigationDrawerExamples}
      sectionId="navigation-drawer-patterns-title"
      sectionTitle="Navigation Drawer Patterns"
      title="Navigation Drawer"
    />
  );
}

const navigationDrawerExamples: ComponentExample[] = [
  {
    component: NavigationDrawer01,
    id: "01",
    name: "Standard navigation drawer",
    wide: true,
  },
  {
    component: NavigationDrawer02,
    id: "02",
    name: "Modal navigation drawer",
  },
  {
    component: NavigationDrawer03,
    id: "03",
    name: "Grouped navigation drawer",
  },
  {
    component: NavigationDrawer04,
    id: "04",
    name: "Account navigation drawer",
  },
];
