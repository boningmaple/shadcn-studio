import { createFileRoute } from "@tanstack/react-router";

import SideSheet01 from "@/ui/material-design/components/md-side-sheet/demos/md-side-sheet-01";
import SideSheet02 from "@/ui/material-design/components/md-side-sheet/demos/md-side-sheet-02";
import SideSheet03 from "@/ui/material-design/components/md-side-sheet/demos/md-side-sheet-03";
import SideSheet04 from "@/ui/material-design/components/md-side-sheet/demos/md-side-sheet-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute("/material-design/components/side-sheet")({
  component: SideSheetComponentPage,
  head: () => ({
    meta: [
      {
        title: "Side Sheet Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Material side sheet patterns built with shadcn Sheet and Sidebar primitives, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SideSheetComponentPage() {
  return (
    <ComponentDemosPage demoComponents={demoComponents} slug="side-sheet" />
  );
}

const demoComponents: DemoComponents<"side-sheet"> = {
  "01": SideSheet01,
  "02": SideSheet02,
  "03": SideSheet03,
  "04": SideSheet04,
};
