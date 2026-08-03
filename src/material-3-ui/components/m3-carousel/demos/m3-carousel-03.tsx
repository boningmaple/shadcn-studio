import {
  M3Carousel,
  M3CarouselContent,
  M3CarouselControls,
  M3CarouselItem,
  M3CarouselNext,
  M3CarouselPrevious,
} from "@/material-3-ui/components/m3-carousel/m3-carousel";
import {
  M3Card,
  M3CardContent,
  M3CardHeader,
} from "@/material-3-ui/components/m3-card/m3-card";

const lessons = [
  "Layout",
  "Color",
  "Type",
  "Motion",
  "Density",
  "Focus",
  "States",
] as const;

export default function M3CarouselDemo() {
  return (
    <M3Carousel aria-label="Design lessons" className="max-w-3xl">
      <M3CarouselContent spacing="sm">
        {lessons.map((lesson, index) => (
          <M3CarouselItem key={lesson} size="compact">
            <M3Card className="h-48" interactive variant="filled">
              <M3CardHeader>
                <span className="text-sm leading-5 text-[#6750a4] dark:text-[#d0bcff]">
                  Lesson {String(index + 1).padStart(2, "0")}
                </span>
              </M3CardHeader>
              <M3CardContent className="flex h-full items-end">
                <span className="text-2xl leading-8 font-medium">{lesson}</span>
              </M3CardContent>
            </M3Card>
          </M3CarouselItem>
        ))}
      </M3CarouselContent>
      <M3CarouselControls>
        <M3CarouselPrevious size="xs" />
        <M3CarouselNext size="xs" />
      </M3CarouselControls>
    </M3Carousel>
  );
}
