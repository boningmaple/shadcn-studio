import { createFileRoute } from "@tanstack/react-router";

import List01 from "@/demos/components/list/list-01";
import List02 from "@/demos/components/list/list-02";
import List03 from "@/demos/components/list/list-03";
import List04 from "@/demos/components/list/list-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/list")({
  component: ListComponentPage,
  head: () => ({
    meta: [
      {
        title: "List Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 list patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ListComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="list"
      description="Explore Material 3 list items with leading content, supporting text, trailing actions, selection controls, and sections."
      exampleNoun="list"
      examples={listExamples}
      sectionId="list-patterns-title"
      sectionTitle="List Patterns"
      title="List"
    />
  );
}

const listExamples: ComponentExample[] = [
  {
    component: List01,
    id: "01",
    name: "Text and metadata list",
  },
  {
    component: List02,
    id: "02",
    name: "Leading and trailing content",
  },
  {
    component: List03,
    id: "03",
    name: "Multi-select list",
  },
  {
    component: List04,
    id: "04",
    name: "Sectioned control list",
  },
];
