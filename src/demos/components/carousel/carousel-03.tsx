import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel/carousel";
import { Card, CardContent, CardHeader } from "@/components/card/card";

const lessons = [
  "Layout",
  "Color",
  "Type",
  "Motion",
  "Density",
  "Focus",
  "States",
] as const;

export default function CarouselDemo() {
  return (
    <Carousel aria-label="Design lessons" className="max-w-3xl">
      <CarouselContent spacing="sm">
        {lessons.map((lesson, index) => (
          <CarouselItem key={lesson} size="compact">
            <Card className="h-48" interactive variant="filled">
              <CardHeader>
                <span className="text-sm leading-5 text-[#6750a4] dark:text-[#d0bcff]">
                  Lesson {String(index + 1).padStart(2, "0")}
                </span>
              </CardHeader>
              <CardContent className="flex h-full items-end">
                <span className="text-2xl leading-8 font-medium">{lesson}</span>
              </CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselControls>
        <CarouselPrevious size="xs" />
        <CarouselNext size="xs" />
      </CarouselControls>
    </Carousel>
  );
}
