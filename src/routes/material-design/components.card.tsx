import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import Card01 from "@/features/ui-material-design/components/md-card/demos/md-card-01";
import Card02 from "@/features/ui-material-design/components/md-card/demos/md-card-02";
import Card03 from "@/features/ui-material-design/components/md-card/demos/md-card-03";
import Card04 from "@/features/ui-material-design/components/md-card/demos/md-card-04";

export const Route = createFileRoute("/material-design/components/card")({
  component: CardComponentPage,
  head: () => ({
    meta: [
      {
        title: "Card Components | VibeUI",
      },
      {
        name: "description",
        content: "Accessible Material 3 card patterns built with React and Tailwind CSS.",
      },
    ],
  }),
});

function CardComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="card" />;
}

const demoComponents: DemoComponents<"card"> = {
  "01": Card01,
  "02": Card02,
  "03": Card03,
  "04": Card04,
};
