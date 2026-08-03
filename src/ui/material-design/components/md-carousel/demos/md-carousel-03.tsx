import {
  MDCarousel,
  MDCarouselContent,
  MDCarouselControls,
  MDCarouselItem,
  MDCarouselNext,
  MDCarouselPrevious,
} from "@/ui/material-design/components/md-carousel/md-carousel";
import {
  MDCard,
  MDCardContent,
  MDCardHeader,
} from "@/ui/material-design/components/md-card/md-card";

const lessons = [
  "Layout",
  "Color",
  "Type",
  "Motion",
  "Density",
  "Focus",
  "States",
] as const;

export default function MDCarouselDemo() {
  return (
    <MDCarousel aria-label="Design lessons" className="max-w-3xl">
      <MDCarouselContent spacing="sm">
        {lessons.map((lesson, index) => (
          <MDCarouselItem key={lesson} size="compact">
            <MDCard className="h-48" interactive variant="filled">
              <MDCardHeader>
                <span className="text-sm leading-5 text-[#6750a4] dark:text-[#d0bcff]">
                  Lesson {String(index + 1).padStart(2, "0")}
                </span>
              </MDCardHeader>
              <MDCardContent className="flex h-full items-end">
                <span className="text-2xl leading-8 font-medium">{lesson}</span>
              </MDCardContent>
            </MDCard>
          </MDCarouselItem>
        ))}
      </MDCarouselContent>
      <MDCarouselControls>
        <MDCarouselPrevious size="xs" />
        <MDCarouselNext size="xs" />
      </MDCarouselControls>
    </MDCarousel>
  );
}
