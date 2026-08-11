import { createFileRoute } from "@tanstack/react-router";

import Button01 from "@/ui/material-design/components/md-button/demos/md-button-01";
import Button02 from "@/ui/material-design/components/md-button/demos/md-button-02";
import Button03 from "@/ui/material-design/components/md-button/demos/md-button-03";
import Button04 from "@/ui/material-design/components/md-button/demos/md-button-04";
import Button05 from "@/ui/material-design/components/md-button/demos/md-button-05";
import Button06 from "@/ui/material-design/components/md-button/demos/md-button-06";
import Button07 from "@/ui/material-design/components/md-button/demos/md-button-07";
import Button08 from "@/ui/material-design/components/md-button/demos/md-button-08";
import Button09 from "@/ui/material-design/components/md-button/demos/md-button-09";
import Button10 from "@/ui/material-design/components/md-button/demos/md-button-10";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/button")({
  component: ButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Button Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ButtonComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="button" />;
}

const demoComponents: DemoComponents<"button"> = {
  "01": Button01,
  "02": Button02,
  "03": Button03,
  "04": Button04,
  "05": Button05,
  "06": Button06,
  "07": Button07,
  "08": Button08,
  "09": Button09,
  "10": Button10,
};
