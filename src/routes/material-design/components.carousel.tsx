import { createFileRoute } from "@tanstack/react-router";

import { ComponentDemosPage } from "@/features/demo-preview/components/component-demos-page";
import type { DemoComponents } from "@/features/demo-preview/types/demo-components";
import Carousel01 from "@/features/ui-material-design/components/md-carousel/demos/md-carousel-01";
import Carousel02 from "@/features/ui-material-design/components/md-carousel/demos/md-carousel-02";
import Carousel03 from "@/features/ui-material-design/components/md-carousel/demos/md-carousel-03";
import Carousel04 from "@/features/ui-material-design/components/md-carousel/demos/md-carousel-04";

export const Route = createFileRoute("/material-design/components/carousel")({
  component: CarouselComponentPage,
  head: () => ({
    meta: [
      {
        title: "Carousel Components | VibeUI",
      },
      {
        name: "description",
        content:
          "Accessible Material 3 carousel patterns built with Embla, React, and Tailwind CSS.",
      },
    ],
  }),
});

function CarouselComponentPage() {
  return <ComponentDemosPage demoComponents={demoComponents} slug="carousel" />;
}

const demoComponents: DemoComponents<"carousel"> = {
  "01": Carousel01,
  "02": Carousel02,
  "03": Carousel03,
  "04": Carousel04,
};
