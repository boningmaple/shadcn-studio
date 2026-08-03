import { createFileRoute } from "@tanstack/react-router";

import Carousel01 from "@/ui/material-design/components/md-carousel/demos/md-carousel-01";
import Carousel02 from "@/ui/material-design/components/md-carousel/demos/md-carousel-02";
import Carousel03 from "@/ui/material-design/components/md-carousel/demos/md-carousel-03";
import Carousel04 from "@/ui/material-design/components/md-carousel/demos/md-carousel-04";
import {
  ComponentExamplesPage,
  type ComponentExample,
} from "@/ui/app/component-examples-page";

export const Route = createFileRoute("/material-design/components/carousel")({
  component: CarouselComponentPage,
  head: () => ({
    meta: [
      {
        title: "Carousel Components | Shadcn Studio",
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
  return (
    <ComponentExamplesPage
      codeArtifactPrefix="md-carousel"
      description="Explore Material 3 carousel layouts for horizontal browsing, hero panels, compact cards, and vertical update stacks."
      exampleNoun="carousel"
      examples={carouselExamples}
      sectionId="carousel-patterns-title"
      sectionTitle="Carousel Patterns"
      title="Carousel"
    />
  );
}

const carouselExamples: ComponentExample[] = [
  {
    component: Carousel01,
    id: "01",
    name: "Browse carousel with cards",
    wide: true,
  },
  {
    component: Carousel02,
    id: "02",
    name: "Hero carousel",
    wide: true,
  },
  {
    component: Carousel03,
    id: "03",
    name: "Compact carousel",
    wide: true,
  },
  {
    component: Carousel04,
    id: "04",
    name: "Vertical supporting carousel",
    wide: true,
  },
];
