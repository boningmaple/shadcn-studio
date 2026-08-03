import { createFileRoute } from "@tanstack/react-router";

import Search01 from "@/ui/material-design/components/md-search/demos/md-search-01";
import Search02 from "@/ui/material-design/components/md-search/demos/md-search-02";
import Search03 from "@/ui/material-design/components/md-search/demos/md-search-03";
import Search04 from "@/ui/material-design/components/md-search/demos/md-search-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/material-design/components/search")({
  component: SearchComponentPage,
  head: () => ({
    meta: [
      {
        title: "Search Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 search bar and search view patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SearchComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-search"
      description="Explore Material 3 search bars, trailing actions, docked search views, and full-screen search views."
      exampleNoun="search"
      examples={searchExamples}
      sectionId="search-patterns-title"
      sectionTitle="Search Patterns"
      title="Search"
    />
  );
}

const searchExamples: ComponentExample[] = [
  {
    component: Search01,
    id: "01",
    name: "Search bar states",
  },
  {
    component: Search02,
    id: "02",
    name: "Search bar actions",
  },
  {
    component: Search03,
    id: "03",
    name: "Docked search view",
  },
  {
    component: Search04,
    id: "04",
    name: "Full-screen search view",
  },
];
