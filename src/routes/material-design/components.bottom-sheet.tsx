import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import BottomSheet01 from "@/features/ui-material-design/components/md-bottom-sheet/demos/md-bottom-sheet-01";
import BottomSheet02 from "@/features/ui-material-design/components/md-bottom-sheet/demos/md-bottom-sheet-02";
import BottomSheet03 from "@/features/ui-material-design/components/md-bottom-sheet/demos/md-bottom-sheet-03";
import BottomSheet04 from "@/features/ui-material-design/components/md-bottom-sheet/demos/md-bottom-sheet-04";

export const Route = createFileRoute("/material-design/components/bottom-sheet")({
  component: BottomSheetComponentPage,
  head: () => ({
    meta: [
      {
        title: "Bottom Sheet Components | VibeUI",
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
  return <ComponentDemosPage demoComponents={demoComponents} slug="bottom-sheet" />;
}

const demoComponents: DemoComponents<"bottom-sheet"> = {
  "01": BottomSheet01,
  "02": BottomSheet02,
  "03": BottomSheet03,
  "04": BottomSheet04,
};
