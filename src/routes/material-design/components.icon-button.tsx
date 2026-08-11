import { createFileRoute } from "@tanstack/react-router";

import IconButton01 from "@/ui/material-design/components/md-icon-button/demos/md-icon-button-01";
import IconButton02 from "@/ui/material-design/components/md-icon-button/demos/md-icon-button-02";
import IconButton03 from "@/ui/material-design/components/md-icon-button/demos/md-icon-button-03";
import IconButton04 from "@/ui/material-design/components/md-icon-button/demos/md-icon-button-04";
import IconButton05 from "@/ui/material-design/components/md-icon-button/demos/md-icon-button-05";
import IconButton06 from "@/ui/material-design/components/md-icon-button/demos/md-icon-button-06";
import IconButton07 from "@/ui/material-design/components/md-icon-button/demos/md-icon-button-07";
import IconButton08 from "@/ui/material-design/components/md-icon-button/demos/md-icon-button-08";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/icon-button")(
  {
    component: IconButtonComponentPage,
    head: () => ({
      meta: [
        {
          title: "Icon Button Components | Shadcn Studio",
        },
        {
          name: "description",
          content:
            "Accessible Material 3 icon button patterns built with React Aria, React, and Tailwind CSS.",
        },
      ],
    }),
  },
);

function IconButtonComponentPage() {
  return (
    <ComponentDemosPage demoComponents={demoComponents} slug="icon-button" />
  );
}

const demoComponents: DemoComponents<"icon-button"> = {
  "01": IconButton01,
  "02": IconButton02,
  "03": IconButton03,
  "04": IconButton04,
  "05": IconButton05,
  "06": IconButton06,
  "07": IconButton07,
  "08": IconButton08,
};
