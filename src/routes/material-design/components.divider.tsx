import { createFileRoute } from "@tanstack/react-router";

import Divider01 from "@/ui/material-design/components/md-divider/demos/md-divider-01";
import Divider02 from "@/ui/material-design/components/md-divider/demos/md-divider-02";
import Divider03 from "@/ui/material-design/components/md-divider/demos/md-divider-03";
import Divider04 from "@/ui/material-design/components/md-divider/demos/md-divider-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/divider")({
  component: DividerComponentPage,
  head: () => ({
    meta: [
      {
        title: "Divider Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 divider patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function DividerComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="divider" />;
}

const demoComponents: DemoComponents<"divider"> = {
  "01": Divider01,
  "02": Divider02,
  "03": Divider03,
  "04": Divider04,
};
