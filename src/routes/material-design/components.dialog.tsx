import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import Dialog01 from "@/features/ui-material-design/components/md-dialog/demos/md-dialog-01";
import Dialog02 from "@/features/ui-material-design/components/md-dialog/demos/md-dialog-02";
import Dialog03 from "@/features/ui-material-design/components/md-dialog/demos/md-dialog-03";
import Dialog04 from "@/features/ui-material-design/components/md-dialog/demos/md-dialog-04";

export const Route = createFileRoute("/material-design/components/dialog")({
  component: DialogComponentPage,
  head: () => ({
    meta: [
      {
        title: "Dialog Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 dialog patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function DialogComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="dialog" />;
}

const demoComponents: DemoComponents<"dialog"> = {
  "01": Dialog01,
  "02": Dialog02,
  "03": Dialog03,
  "04": Dialog04,
};
