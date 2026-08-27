import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import Divider01 from "@/features/ui-material-design/components/md-divider/demos/md-divider-01";
import Divider02 from "@/features/ui-material-design/components/md-divider/demos/md-divider-02";
import Divider03 from "@/features/ui-material-design/components/md-divider/demos/md-divider-03";
import Divider04 from "@/features/ui-material-design/components/md-divider/demos/md-divider-04";

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
