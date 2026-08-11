import { createFileRoute } from "@tanstack/react-router";

import List01 from "@/ui/material-design/components/md-list/demos/md-list-01";
import List02 from "@/ui/material-design/components/md-list/demos/md-list-02";
import List03 from "@/ui/material-design/components/md-list/demos/md-list-03";
import List04 from "@/ui/material-design/components/md-list/demos/md-list-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/list")({
  component: ListComponentPage,
  head: () => ({
    meta: [
      {
        title: "List Components | VibeUI",
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
  return <ComponentDemosPage demoComponents={demoComponents} slug="list" />;
}

const demoComponents: DemoComponents<"list"> = {
  "01": List01,
  "02": List02,
  "03": List03,
  "04": List04,
};
