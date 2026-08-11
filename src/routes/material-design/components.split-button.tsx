import { createFileRoute } from "@tanstack/react-router";

import SplitButton01 from "@/ui/material-design/components/md-split-button/demos/md-split-button-01";
import SplitButton02 from "@/ui/material-design/components/md-split-button/demos/md-split-button-02";
import SplitButton03 from "@/ui/material-design/components/md-split-button/demos/md-split-button-03";
import SplitButton04 from "@/ui/material-design/components/md-split-button/demos/md-split-button-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute(
  "/material-design/components/split-button",
)({
  component: SplitButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Split Button Components | Shadcn Studio",
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
  return (
    <ComponentDemosPage demoComponents={demoComponents} slug="split-button" />
  );
}

const demoComponents: DemoComponents<"split-button"> = {
  "01": SplitButton01,
  "02": SplitButton02,
  "03": SplitButton03,
  "04": SplitButton04,
};
