import { createFileRoute } from "@tanstack/react-router";

import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";
import IconButton01 from "@/demos/components/icon-button/icon-button-01";
import IconButton02 from "@/demos/components/icon-button/icon-button-02";
import IconButton03 from "@/demos/components/icon-button/icon-button-03";
import IconButton04 from "@/demos/components/icon-button/icon-button-04";
import IconButton05 from "@/demos/components/icon-button/icon-button-05";
import IconButton06 from "@/demos/components/icon-button/icon-button-06";
import IconButton07 from "@/demos/components/icon-button/icon-button-07";
import IconButton08 from "@/demos/components/icon-button/icon-button-08";

export const Route = createFileRoute("/components/icon-button")({
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
});

function IconButtonComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="icon-button"
      description="Explore Material 3 icon button colors, toggle states, shapes, sizes, widths, and tooltips, built with React Aria UI, React, and Tailwind CSS."
      exampleNoun="icon button"
      examples={iconButtonExamples}
      sectionId="icon-button-examples-title"
      sectionTitle="Icon Button Examples"
      title="Icon Button"
    />
  );
}

const iconButtonExamples: ComponentExample[] = [
  {
    component: IconButton01,
    id: "01",
    name: "Default color styles",
    wide: true,
  },
  {
    component: IconButton02,
    id: "02",
    name: "Toggle color styles",
    wide: true,
  },
  {
    component: IconButton03,
    id: "03",
    name: "Default states",
    wide: true,
  },
  {
    component: IconButton04,
    id: "04",
    name: "Toggle states",
    wide: true,
  },
  {
    component: IconButton05,
    id: "05",
    name: "Round and square shapes",
  },
  {
    component: IconButton06,
    id: "06",
    name: "Five sizes",
    wide: true,
  },
  {
    component: IconButton07,
    id: "07",
    name: "Narrow, default, and wide widths",
  },
  {
    component: IconButton08,
    id: "08",
    name: "Web tooltips",
  },
];
