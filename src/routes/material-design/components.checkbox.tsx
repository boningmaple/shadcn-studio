import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import Checkbox01 from "@/features/ui-material-design/components/md-checkbox/demos/md-checkbox-01";
import Checkbox02 from "@/features/ui-material-design/components/md-checkbox/demos/md-checkbox-02";
import Checkbox03 from "@/features/ui-material-design/components/md-checkbox/demos/md-checkbox-03";
import Checkbox04 from "@/features/ui-material-design/components/md-checkbox/demos/md-checkbox-04";
import Checkbox05 from "@/features/ui-material-design/components/md-checkbox/demos/md-checkbox-05";

export const Route = createFileRoute("/material-design/components/checkbox")({
  component: CheckboxComponentPage,
  head: () => ({
    meta: [
      {
        title: "Checkbox Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 checkbox patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function CheckboxComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="checkbox" />;
}

const demoComponents: DemoComponents<"checkbox"> = {
  "01": Checkbox01,
  "02": Checkbox02,
  "03": Checkbox03,
  "04": Checkbox04,
  "05": Checkbox05,
};
