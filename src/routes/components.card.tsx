import { createFileRoute } from "@tanstack/react-router";

import Card01 from "@/demos/components/card/card-01";
import Card02 from "@/demos/components/card/card-02";
import Card03 from "@/demos/components/card/card-03";
import Card04 from "@/demos/components/card/card-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/card")({
  component: CardComponentPage,
  head: () => ({
    meta: [
      {
        title: "Card Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 card patterns built with React and Tailwind CSS.",
      },
    ],
  }),
});

function CardComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="card"
      description="Explore Material 3 elevated, filled, and outlined card containers with reusable content and action slots."
      exampleNoun="card"
      examples={cardExamples}
      sectionId="card-patterns-title"
      sectionTitle="Card Patterns"
      title="Card"
    />
  );
}

const cardExamples: ComponentExample[] = [
  {
    component: Card01,
    id: "01",
    name: "Material 3 card variants",
    wide: true,
  },
  {
    component: Card02,
    id: "02",
    name: "Card with media and actions",
    wide: true,
  },
  {
    component: Card03,
    id: "03",
    name: "Interactive outlined cards",
    wide: true,
  },
  {
    component: Card04,
    id: "04",
    name: "Elevated checklist card",
    wide: true,
  },
];
