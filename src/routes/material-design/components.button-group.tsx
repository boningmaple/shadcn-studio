import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import ButtonGroup01 from "@/features/ui-material-design/components/md-button-group/demos/md-button-group-01";
import ButtonGroup02 from "@/features/ui-material-design/components/md-button-group/demos/md-button-group-02";
import ButtonGroup03 from "@/features/ui-material-design/components/md-button-group/demos/md-button-group-03";
import ButtonGroup04 from "@/features/ui-material-design/components/md-button-group/demos/md-button-group-04";

export const Route = createFileRoute("/material-design/components/button-group")({
  component: ButtonGroupComponentPage,
  head: () => ({
    meta: [
      {
        title: "Button Group Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 button group patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ButtonGroupComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="button-group" />;
}

const demoComponents: DemoComponents<"button-group"> = {
  "01": ButtonGroup01,
  "02": ButtonGroup02,
  "03": ButtonGroup03,
  "04": ButtonGroup04,
};
