import { createFileRoute } from "@tanstack/react-router";

import Dialog01 from "@/ui/material-design/components/md-dialog/demos/md-dialog-01";
import Dialog02 from "@/ui/material-design/components/md-dialog/demos/md-dialog-02";
import Dialog03 from "@/ui/material-design/components/md-dialog/demos/md-dialog-03";
import Dialog04 from "@/ui/material-design/components/md-dialog/demos/md-dialog-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

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
