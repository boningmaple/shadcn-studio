import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import SplitButton01 from "@/features/ui-material-design/components/md-split-button/demos/md-split-button-01";
import SplitButton02 from "@/features/ui-material-design/components/md-split-button/demos/md-split-button-02";
import SplitButton03 from "@/features/ui-material-design/components/md-split-button/demos/md-split-button-03";
import SplitButton04 from "@/features/ui-material-design/components/md-split-button/demos/md-split-button-04";

export const Route = createFileRoute("/material-design/components/split-button")({
  component: SplitButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Split Button Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 split button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SplitButtonComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="split-button" />;
}

const demoComponents: DemoComponents<"split-button"> = {
  "01": SplitButton01,
  "02": SplitButton02,
  "03": SplitButton03,
  "04": SplitButton04,
};
