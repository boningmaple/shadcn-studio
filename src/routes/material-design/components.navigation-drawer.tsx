import { createFileRoute } from "@tanstack/react-router";

import NavigationDrawer01 from "@/ui/material-design/components/md-navigation-drawer/demos/md-navigation-drawer-01";
import NavigationDrawer02 from "@/ui/material-design/components/md-navigation-drawer/demos/md-navigation-drawer-02";
import NavigationDrawer03 from "@/ui/material-design/components/md-navigation-drawer/demos/md-navigation-drawer-03";
import NavigationDrawer04 from "@/ui/material-design/components/md-navigation-drawer/demos/md-navigation-drawer-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute(
  "/material-design/components/navigation-drawer",
)({
  component: NavigationDrawerComponentPage,
  head: () => ({
    meta: [
      {
        title: "Navigation Drawer Components | VibeUI",
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
    <ComponentDemosPage
      demoComponents={demoComponents}
      slug="navigation-drawer"
    />
  );
}

const demoComponents: DemoComponents<"navigation-drawer"> = {
  "01": NavigationDrawer01,
  "02": NavigationDrawer02,
  "03": NavigationDrawer03,
  "04": NavigationDrawer04,
};
