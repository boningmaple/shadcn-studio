import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import ExtendedFAB01 from "@/features/ui-material-design/components/md-extended-fab/demos/md-extended-fab-01";
import ExtendedFAB02 from "@/features/ui-material-design/components/md-extended-fab/demos/md-extended-fab-02";
import ExtendedFAB03 from "@/features/ui-material-design/components/md-extended-fab/demos/md-extended-fab-03";
import ExtendedFAB04 from "@/features/ui-material-design/components/md-extended-fab/demos/md-extended-fab-04";

export const Route = createFileRoute("/material-design/components/extended-fab")({
  component: ExtendedFABComponentPage,
  head: () => ({
    meta: [
      {
        title: "Extended FAB Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 extended floating action button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ExtendedFABComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="extended-fab" />;
}

const demoComponents: DemoComponents<"extended-fab"> = {
  "01": ExtendedFAB01,
  "02": ExtendedFAB02,
  "03": ExtendedFAB03,
  "04": ExtendedFAB04,
};
