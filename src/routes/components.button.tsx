import { createFileRoute } from "@tanstack/react-router";

import Button01 from "@/components/button/button-01";
import Button02 from "@/components/button/button-02";
import Button03 from "@/components/button/button-03";
import Button04 from "@/components/button/button-04";
import Button05 from "@/components/button/button-05";
import Button06 from "@/components/button/button-06";
import Button07 from "@/components/button/button-07";
import Button08 from "@/components/button/button-08";
import Button09 from "@/components/button/button-09";
import Button10 from "@/components/button/button-10";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/button")({
  component: ButtonComponentsPage,
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

function ButtonComponentsPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="button"
      description="Explore a collection of buttons, built with Material Design, React Aria UI, React, and Tailwind CSS."
      exampleNoun="button"
      examples={buttonExamples}
      sectionId="button-variants-title"
      sectionTitle="Button Variants"
      title="Button"
    />
  );
}

const buttonExamples: ComponentExample[] = [
  { component: Button01, id: "01", name: "Material 3 variants", wide: true },
  {
    component: Button02,
    id: "02",
    name: "Material 3 variants with icon",
    wide: true,
  },
  {
    component: Button03,
    id: "03",
    name: "Elevated button states",
    wide: true,
  },
  {
    component: Button04,
    id: "04",
    name: "Filled button states",
    wide: true,
  },
  {
    component: Button05,
    id: "05",
    name: "Tonal button states",
    wide: true,
  },
  {
    component: Button06,
    id: "06",
    name: "Outlined button states",
    wide: true,
  },
  {
    component: Button07,
    id: "07",
    name: "Text button states",
    wide: true,
  },
  { component: Button08, id: "08", name: "Material 3 shapes", wide: true },
  { component: Button09, id: "09", name: "Material 3 sizes", wide: true },
  {
    component: Button10,
    id: "10",
    name: "Material 3 sizes with icon",
    wide: true,
  },
];
