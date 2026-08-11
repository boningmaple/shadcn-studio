import { createFileRoute } from "@tanstack/react-router";

import Checkbox01 from "@/ui/material-design/components/md-checkbox/demos/md-checkbox-01";
import Checkbox02 from "@/ui/material-design/components/md-checkbox/demos/md-checkbox-02";
import Checkbox03 from "@/ui/material-design/components/md-checkbox/demos/md-checkbox-03";
import Checkbox04 from "@/ui/material-design/components/md-checkbox/demos/md-checkbox-04";
import Checkbox05 from "@/ui/material-design/components/md-checkbox/demos/md-checkbox-05";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/checkbox")({
  component: CheckboxComponentPage,
  head: () => ({
    meta: [
      {
        title: "Checkbox Components | Shadcn Studio",
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
