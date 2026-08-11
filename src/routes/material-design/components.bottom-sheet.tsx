import { createFileRoute } from "@tanstack/react-router";

import BottomSheet01 from "@/ui/material-design/components/md-bottom-sheet/demos/md-bottom-sheet-01";
import BottomSheet02 from "@/ui/material-design/components/md-bottom-sheet/demos/md-bottom-sheet-02";
import BottomSheet03 from "@/ui/material-design/components/md-bottom-sheet/demos/md-bottom-sheet-03";
import BottomSheet04 from "@/ui/material-design/components/md-bottom-sheet/demos/md-bottom-sheet-04";
import {
  ComponentDemosPage,
  type DemoComponents,
} from "@/ui/app/component-demos-page";

export const Route = createFileRoute(
  "/material-design/components/bottom-sheet",
)({
  component: BottomSheetComponentPage,
  head: () => ({
    meta: [
      {
        title: "Bottom Sheet Components | Shadcn Studio",
      },
      {
        name: "description",
        content:
          "Material bottom sheet patterns built with Base UI Drawer, React, and Tailwind CSS.",
      },
    ],
  }),
});

function BottomSheetComponentPage() {
  return (
    <ComponentDemosPage demoComponents={demoComponents} slug="bottom-sheet" />
  );
}

const demoComponents: DemoComponents<"bottom-sheet"> = {
  "01": BottomSheet01,
  "02": BottomSheet02,
  "03": BottomSheet03,
  "04": BottomSheet04,
};
