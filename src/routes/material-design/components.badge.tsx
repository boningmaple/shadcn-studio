import { createFileRoute } from "@tanstack/react-router";

import Badge01 from "@/ui/material-design/components/md-badge/demos/md-badge-01";
import Badge02 from "@/ui/material-design/components/md-badge/demos/md-badge-02";
import Badge03 from "@/ui/material-design/components/md-badge/demos/md-badge-03";
import Badge04 from "@/ui/material-design/components/md-badge/demos/md-badge-04";
import Badge05 from "@/ui/material-design/components/md-badge/demos/md-badge-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

export const Route = createFileRoute("/material-design/components/badge")({
  component: BadgeComponentPage,
  head: () => ({
    meta: [
      {
        title: "Badge Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 badge patterns built with React and Tailwind CSS.",
      },
    ],
  }),
});

function BadgeComponentPage() {
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-badge"
      description="Explore Material 3 notification dots and count badges, built with React and Tailwind CSS."
      exampleNoun="badge"
      examples={badgeExamples}
      sectionId="badge-patterns-title"
      sectionTitle="Badge Patterns"
      title="Badge"
    />
  );
}

const badgeExamples: ComponentExample[] = [
  {
    component: Badge01,
    id: "01",
    name: "Material 3 badge variants",
    wide: true,
  },
  {
    component: Badge02,
    id: "02",
    name: "Badges on icon controls",
    wide: true,
  },
  {
    component: Badge03,
    id: "03",
    name: "Clear badge on selection",
    wide: true,
  },
  {
    component: Badge04,
    id: "04",
    name: "Badges in tabs",
    wide: true,
  },
  {
    component: Badge05,
    id: "05",
    name: "Right-to-left placement",
    wide: true,
  },
];
