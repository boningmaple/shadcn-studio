import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import ToggleButton01 from "@/features/ui-material-design/components/md-toggle-button/demos/md-toggle-button-01";
import ToggleButton02 from "@/features/ui-material-design/components/md-toggle-button/demos/md-toggle-button-02";
import ToggleButton03 from "@/features/ui-material-design/components/md-toggle-button/demos/md-toggle-button-03";
import ToggleButton04 from "@/features/ui-material-design/components/md-toggle-button/demos/md-toggle-button-04";
import ToggleButton05 from "@/features/ui-material-design/components/md-toggle-button/demos/md-toggle-button-05";
import ToggleButton06 from "@/features/ui-material-design/components/md-toggle-button/demos/md-toggle-button-06";

export const Route = createFileRoute("/material-design/components/toggle-button")({
  component: ToggleButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Toggle Button Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 toggle button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ToggleButtonComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="toggle-button" />;
}

const demoComponents: DemoComponents<"toggle-button"> = {
  "01": ToggleButton01,
  "02": ToggleButton02,
  "03": ToggleButton03,
  "04": ToggleButton04,
  "05": ToggleButton05,
  "06": ToggleButton06,
};
