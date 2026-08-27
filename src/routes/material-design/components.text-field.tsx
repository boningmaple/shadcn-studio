import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import TextField01 from "@/features/ui-material-design/components/md-text-field/demos/md-text-field-01";
import TextField02 from "@/features/ui-material-design/components/md-text-field/demos/md-text-field-02";
import TextField03 from "@/features/ui-material-design/components/md-text-field/demos/md-text-field-03";
import TextField04 from "@/features/ui-material-design/components/md-text-field/demos/md-text-field-04";
import TextField05 from "@/features/ui-material-design/components/md-text-field/demos/md-text-field-05";

export const Route = createFileRoute("/material-design/components/text-field")({
  component: TextFieldComponentPage,
  head: () => ({
    meta: [
      {
        title: "Text Field Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 text field and text area patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function TextFieldComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="text-field" />;
}

const demoComponents: DemoComponents<"text-field"> = {
  "01": TextField01,
  "02": TextField02,
  "03": TextField03,
  "04": TextField04,
  "05": TextField05,
};
