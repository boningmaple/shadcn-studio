import { createFileRoute } from "@tanstack/react-router";

import RadioButton01 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-01";
import RadioButton02 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-02";
import RadioButton03 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-03";
import RadioButton04 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-04";
import RadioButton05 from "@/ui/material-design/components/md-radio-button/demos/md-radio-button-05";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute(
  "/material-design/components/radio-button",
)({
  component: RadioButtonComponentPage,
  head: () => ({
    meta: [
      {
        title: "Radio Button Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 radio button patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function RadioButtonComponentPage() {
  return (
    <ComponentDemosPage demoComponents={demoComponents} slug="radio-button" />
  );
}

const demoComponents: DemoComponents<"radio-button"> = {
  "01": RadioButton01,
  "02": RadioButton02,
  "03": RadioButton03,
  "04": RadioButton04,
  "05": RadioButton05,
};
