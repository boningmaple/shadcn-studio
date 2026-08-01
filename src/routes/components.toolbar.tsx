import { createFileRoute } from "@tanstack/react-router";

import Toolbar01 from "@/demos/components/toolbar/toolbar-01";
import Toolbar02 from "@/demos/components/toolbar/toolbar-02";
import Toolbar03 from "@/demos/components/toolbar/toolbar-03";
import Toolbar04 from "@/demos/components/toolbar/toolbar-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/toolbar")({
  component: ToolbarComponentPage,
  head: () => ({
    meta: [
      {
        title: "Toolbar Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material toolbar patterns built with React Aria Toolbar, React, and Tailwind CSS.",
      },
    ],
  }),
});

function ToolbarComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="toolbar"
      description="Explore Material toolbar patterns for document actions, formatting, bottom actions, and contextual editing."
      exampleNoun="toolbar"
      examples={toolbarExamples}
      sectionId="toolbar-patterns-title"
      sectionTitle="Toolbar Patterns"
      title="Toolbar"
    />
  );
}

const toolbarExamples: ComponentExample[] = [
  {
    component: Toolbar01,
    id: "01",
    name: "Document toolbar",
    wide: true,
  },
  {
    component: Toolbar02,
    id: "02",
    name: "Formatting toolbar",
  },
  {
    component: Toolbar03,
    id: "03",
    name: "Bottom toolbar",
    wide: true,
  },
  {
    component: Toolbar04,
    id: "04",
    name: "Contextual toolbars",
    wide: true,
  },
];
