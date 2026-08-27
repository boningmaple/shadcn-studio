import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import Search01 from "@/features/ui-material-design/components/md-search/demos/md-search-01";
import Search02 from "@/features/ui-material-design/components/md-search/demos/md-search-02";
import Search03 from "@/features/ui-material-design/components/md-search/demos/md-search-03";
import Search04 from "@/features/ui-material-design/components/md-search/demos/md-search-04";

export const Route = createFileRoute("/material-design/components/search")({
  component: SearchComponentPage,
  head: () => ({
    meta: [
      {
        title: "Search Components | VibeUI",
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
  return <ComponentDemosPage demoComponents={demoComponents} slug="search" />;
}

const demoComponents: DemoComponents<"search"> = {
  "01": Search01,
  "02": Search02,
  "03": Search03,
  "04": Search04,
};
