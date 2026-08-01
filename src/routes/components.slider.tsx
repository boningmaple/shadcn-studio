import { createFileRoute } from "@tanstack/react-router";

import Slider01 from "@/demos/components/slider/slider-01";
import Slider02 from "@/demos/components/slider/slider-02";
import Slider03 from "@/demos/components/slider/slider-03";
import Slider04 from "@/demos/components/slider/slider-04";
import Slider05 from "@/demos/components/slider/slider-05";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/components/component-examples-page";

export const Route = createFileRoute("/components/slider")({
  component: SliderComponentPage,
  head: () => ({
    meta: [
      {
        title: "Slider Components | Shadcn Studio",
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
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="slider"
      description="Explore Material 3 sliders and range sliders for selecting a value from a continuous or stepped range."
      exampleNoun="slider"
      examples={sliderExamples}
      sectionId="slider-patterns-title"
      sectionTitle="Slider Patterns"
      title="Slider"
    />
  );
}

const sliderExamples: ComponentExample[] = [
  {
    component: Slider01,
    id: "01",
    name: "Slider states",
    wide: true,
  },
  {
    component: Slider02,
    id: "02",
    name: "Step sliders",
    wide: true,
  },
  {
    component: Slider03,
    id: "03",
    name: "Range slider",
    wide: true,
  },
  {
    component: Slider04,
    id: "04",
    name: "Slider value formatting",
    wide: true,
  },
  {
    component: Slider05,
    id: "05",
    name: "Vertical sliders",
    wide: true,
  },
];
