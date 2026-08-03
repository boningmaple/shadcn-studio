import { createFileRoute } from "@tanstack/react-router";

import Toolbar01 from "@/ui/material-design/components/md-toolbar/demos/md-toolbar-01";
import Toolbar02 from "@/ui/material-design/components/md-toolbar/demos/md-toolbar-02";
import Toolbar03 from "@/ui/material-design/components/md-toolbar/demos/md-toolbar-03";
import Toolbar04 from "@/ui/material-design/components/md-toolbar/demos/md-toolbar-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-design/components/toolbar")({
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
      codeArtifactPrefix="md-toolbar"
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
