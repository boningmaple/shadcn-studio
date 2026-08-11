import { createFileRoute } from "@tanstack/react-router";

import Chips01 from "@/ui/material-design/components/md-chips/demos/md-chips-01";
import Chips02 from "@/ui/material-design/components/md-chips/demos/md-chips-02";
import Chips03 from "@/ui/material-design/components/md-chips/demos/md-chips-03";
import Chips04 from "@/ui/material-design/components/md-chips/demos/md-chips-04";
import Chips05 from "@/ui/material-design/components/md-chips/demos/md-chips-05";
import Chips06 from "@/ui/material-design/components/md-chips/demos/md-chips-06";
import Chips07 from "@/ui/material-design/components/md-chips/demos/md-chips-07";
import Chips08 from "@/ui/material-design/components/md-chips/demos/md-chips-08";
import Chips09 from "@/ui/material-design/components/md-chips/demos/md-chips-09";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/chips")({
  component: ChipsComponentPage,
  head: () => ({
    meta: [
      {
        title: "Chips Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 assist, filter, and suggestion chips built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ChipsComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="chips" />;
}

const demoComponents: DemoComponents<"chips"> = {
  "01": Chips01,
  "02": Chips02,
  "03": Chips03,
  "04": Chips04,
  "05": Chips05,
  "06": Chips06,
  "07": Chips07,
  "08": Chips08,
  "09": Chips09,
};
