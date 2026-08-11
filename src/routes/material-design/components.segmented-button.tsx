import { createFileRoute } from "@tanstack/react-router";

import SegmentedButton01 from "@/ui/material-design/components/md-segmented-button/demos/md-segmented-button-01";
import SegmentedButton02 from "@/ui/material-design/components/md-segmented-button/demos/md-segmented-button-02";
import SegmentedButton03 from "@/ui/material-design/components/md-segmented-button/demos/md-segmented-button-03";
import SegmentedButton04 from "@/ui/material-design/components/md-segmented-button/demos/md-segmented-button-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute(
  "/material-design/components/segmented-button",
)({
  component: SegmentedButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Segmented Button Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 segmented button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SegmentedButtonComponentPage() {
  return (
    <ComponentDemosPage
      demoComponents={demoComponents}
      slug="segmented-button"
    />
  );
}

const demoComponents: DemoComponents<"segmented-button"> = {
  "01": SegmentedButton01,
  "02": SegmentedButton02,
  "03": SegmentedButton03,
  "04": SegmentedButton04,
};
