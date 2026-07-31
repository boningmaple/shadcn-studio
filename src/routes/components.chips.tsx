import { createFileRoute } from "@tanstack/react-router";

import Chips01 from "@/demos/components/chips/chips-01";
import Chips02 from "@/demos/components/chips/chips-02";
import Chips03 from "@/demos/components/chips/chips-03";
import Chips04 from "@/demos/components/chips/chips-04";
import Chips05 from "@/demos/components/chips/chips-05";
import Chips06 from "@/demos/components/chips/chips-06";
import Chips07 from "@/demos/components/chips/chips-07";
import Chips08 from "@/demos/components/chips/chips-08";
import Chips09 from "@/demos/components/chips/chips-09";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/chips")({
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
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="chips"
      description="Explore accessible Material Design 3 assist, filter, and suggestion chips built with React Aria TagGroup, React, and Tailwind CSS."
      exampleNoun="chips example"
      examples={chipsExamples}
      sectionId="chips-variants-title"
      sectionTitle="Chips Variants"
      title="Chips"
    />
  );
}

const chipsExamples: ComponentExample[] = [
  { component: Chips01, id: "01", name: "Assist chips", wide: true },
  { component: Chips02, id: "02", name: "Filter chips", wide: true },
  { component: Chips03, id: "03", name: "Suggestion chips", wide: true },
  {
    component: Chips04,
    id: "04",
    name: "Outlined assist chip states",
    wide: true,
  },
  {
    component: Chips05,
    id: "05",
    name: "Elevated assist chip states",
    wide: true,
  },
  {
    component: Chips06,
    id: "06",
    name: "Outlined filter chip states",
    wide: true,
  },
  {
    component: Chips07,
    id: "07",
    name: "Elevated filter chip states",
    wide: true,
  },
  {
    component: Chips08,
    id: "08",
    name: "Outlined suggestion chip states",
    wide: true,
  },
  {
    component: Chips09,
    id: "09",
    name: "Elevated suggestion chip states",
    wide: true,
  },
];
