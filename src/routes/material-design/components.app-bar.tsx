import { createFileRoute } from "@tanstack/react-router";

import AppBar01 from "@/ui/material-design/components/md-app-bar/demos/md-app-bar-01";
import AppBar02 from "@/ui/material-design/components/md-app-bar/demos/md-app-bar-02";
import AppBar03 from "@/ui/material-design/components/md-app-bar/demos/md-app-bar-03";
import AppBar04 from "@/ui/material-design/components/md-app-bar/demos/md-app-bar-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

export const Route = createFileRoute("/material-design/components/app-bar")({
  component: AppBarComponentPage,
  head: () => ({
    meta: [
      {
        title: "App Bar Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Material app bar patterns built with Toolbar, SearchBar, Chips, React, and Tailwind CSS.",
      },
    ],
  }),
});

function AppBarComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-app-bar"
      description="Explore Material app bars for navigation, titles, actions, filters, and search."
      exampleNoun="app bar"
      examples={appBarExamples}
      sectionId="app-bar-patterns-title"
      sectionTitle="App Bar Patterns"
      title="App Bar"
    />
  );
}

const appBarExamples: ComponentExample[] = [
  {
    component: AppBar01,
    id: "01",
    name: "Small app bar",
    wide: true,
  },
  {
    component: AppBar02,
    id: "02",
    name: "Centered app bar",
    wide: true,
  },
  {
    component: AppBar03,
    id: "03",
    name: "Medium app bar",
    wide: true,
  },
  {
    component: AppBar04,
    id: "04",
    name: "Search app bar",
    wide: true,
  },
];
