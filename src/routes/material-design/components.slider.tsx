import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import Slider01 from "@/features/ui-material-design/components/md-slider/demos/md-slider-01";
import Slider02 from "@/features/ui-material-design/components/md-slider/demos/md-slider-02";
import Slider03 from "@/features/ui-material-design/components/md-slider/demos/md-slider-03";
import Slider04 from "@/features/ui-material-design/components/md-slider/demos/md-slider-04";
import Slider05 from "@/features/ui-material-design/components/md-slider/demos/md-slider-05";

export const Route = createFileRoute("/material-design/components/slider")({
  component: SliderComponentPage,
  head: () => ({
    meta: [
      {
        title: "Slider Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 slider patterns built with React Aria, React, and Tailwind CSS.",
      },
    ],
  }),
});

function SliderComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="slider" />;
}

const demoComponents: DemoComponents<"slider"> = {
  "01": Slider01,
  "02": Slider02,
  "03": Slider03,
  "04": Slider04,
  "05": Slider05,
};
