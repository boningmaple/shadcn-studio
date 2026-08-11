import { createFileRoute } from "@tanstack/react-router";

import Menu01 from "@/ui/material-design/components/md-menu/demos/md-menu-01";
import Menu02 from "@/ui/material-design/components/md-menu/demos/md-menu-02";
import Menu03 from "@/ui/material-design/components/md-menu/demos/md-menu-03";
import Menu04 from "@/ui/material-design/components/md-menu/demos/md-menu-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/menu")({
  component: MenuComponentPage,
  head: () => ({
    meta: [
      {
        title: "Menu Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 menu patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function MenuComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="menu" />;
}

const demoComponents: DemoComponents<"menu"> = {
  "01": Menu01,
  "02": Menu02,
  "03": Menu03,
  "04": Menu04,
};
