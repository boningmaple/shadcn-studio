import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import IconButton01 from "@/features/ui-material-design/components/md-icon-button/demos/md-icon-button-01";
import IconButton02 from "@/features/ui-material-design/components/md-icon-button/demos/md-icon-button-02";
import IconButton03 from "@/features/ui-material-design/components/md-icon-button/demos/md-icon-button-03";
import IconButton04 from "@/features/ui-material-design/components/md-icon-button/demos/md-icon-button-04";
import IconButton05 from "@/features/ui-material-design/components/md-icon-button/demos/md-icon-button-05";
import IconButton06 from "@/features/ui-material-design/components/md-icon-button/demos/md-icon-button-06";
import IconButton07 from "@/features/ui-material-design/components/md-icon-button/demos/md-icon-button-07";
import IconButton08 from "@/features/ui-material-design/components/md-icon-button/demos/md-icon-button-08";

export const Route = createFileRoute("/material-design/components/icon-button")({
  component: IconButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Icon Button Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 icon button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function IconButtonComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="icon-button" />;
}

const demoComponents: DemoComponents<"icon-button"> = {
  "01": IconButton01,
  "02": IconButton02,
  "03": IconButton03,
  "04": IconButton04,
  "05": IconButton05,
  "06": IconButton06,
  "07": IconButton07,
  "08": IconButton08,
};
