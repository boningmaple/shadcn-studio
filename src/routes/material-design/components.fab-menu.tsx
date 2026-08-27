import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import FABMenu01 from "@/features/ui-material-design/components/md-fab-menu/demos/md-fab-menu-01";
import FABMenu02 from "@/features/ui-material-design/components/md-fab-menu/demos/md-fab-menu-02";
import FABMenu03 from "@/features/ui-material-design/components/md-fab-menu/demos/md-fab-menu-03";
import FABMenu04 from "@/features/ui-material-design/components/md-fab-menu/demos/md-fab-menu-04";

export const Route = createFileRoute("/material-design/components/fab-menu")({
  component: FABMenuComponentPage,
  head: () => ({
    meta: [
      {
        title: "FAB Menu Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 FAB menu patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function FABMenuComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="fab-menu" />;
}

const demoComponents: DemoComponents<"fab-menu"> = {
  "01": FABMenu01,
  "02": FABMenu02,
  "03": FABMenu03,
  "04": FABMenu04,
};
