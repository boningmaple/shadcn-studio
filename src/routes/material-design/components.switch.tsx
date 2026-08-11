import { createFileRoute } from "@tanstack/react-router";

import Switch01 from "@/ui/material-design/components/md-switch/demos/md-switch-01";
import Switch02 from "@/ui/material-design/components/md-switch/demos/md-switch-02";
import Switch03 from "@/ui/material-design/components/md-switch/demos/md-switch-03";
import Switch04 from "@/ui/material-design/components/md-switch/demos/md-switch-04";
import Switch05 from "@/ui/material-design/components/md-switch/demos/md-switch-05";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/switch")({
  component: SwitchComponentPage,
  head: () => ({
    meta: [
      {
        title: "Switch Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 switch patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SwitchComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="switch" />;
}

const demoComponents: DemoComponents<"switch"> = {
  "01": Switch01,
  "02": Switch02,
  "03": Switch03,
  "04": Switch04,
  "05": Switch05,
};
