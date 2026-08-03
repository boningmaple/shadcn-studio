import { createFileRoute } from "@tanstack/react-router";

import Dialog01 from "@/material-3-ui/components/m3-dialog/demos/m3-dialog-01";
import Dialog02 from "@/material-3-ui/components/m3-dialog/demos/m3-dialog-02";
import Dialog03 from "@/material-3-ui/components/m3-dialog/demos/m3-dialog-03";
import Dialog04 from "@/material-3-ui/components/m3-dialog/demos/m3-dialog-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-3-ui/components/dialog")({
  component: DialogComponentPage,
  head: () => ({
    meta: [
      {
        title: "Dialog Components | Shadcn Studio",
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
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="m3-dialog"
      description="Explore Material 3 standard, alert, form, and full-screen dialogs for focused workflows."
      exampleNoun="dialog"
      examples={dialogExamples}
      sectionId="dialog-patterns-title"
      sectionTitle="Dialog Patterns"
      title="Dialog"
    />
  );
}

const dialogExamples: ComponentExample[] = [
  {
    component: Dialog01,
    id: "01",
    name: "Basic dialog",
  },
  {
    component: Dialog02,
    id: "02",
    name: "Alert dialog",
  },
  {
    component: Dialog03,
    id: "03",
    name: "Dialog with text field",
  },
  {
    component: Dialog04,
    id: "04",
    name: "Full-screen dialog",
    wide: true,
  },
];
