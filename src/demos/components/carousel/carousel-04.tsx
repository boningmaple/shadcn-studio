import { ListChecksIcon, SparklesIcon, UsersRoundIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel/carousel";
import { Card, CardContent, CardHeader } from "@/components/card/card";

const updates = [
  {
    icon: SparklesIcon,
    title: "Campaign polish",
    body: "Six page blocks are ready for final copy and image QA.",
  },
  {
    icon: UsersRoundIcon,
    title: "Research room",
    body: "Three customer calls are clipped and tagged for synthesis.",
  },
  {
    icon: ListChecksIcon,
    title: "Launch checks",
    body: "Payments, email, and analytics are all in the review lane.",
  },
] as const;

export default function CarouselDemo() {
  return (
    <Carousel
      aria-label="Project updates"
      className="max-w-2xl"
      orientation="vertical"
    >
      <CarouselContent>
        {updates.map((update) => (
          <CarouselItem key={update.title} size="supporting">
            <Card className="h-full" interactive variant="outlined">
              <CardHeader>
                <span className="flex size-12 items-center justify-center rounded-[16px] bg-[#e8def8] text-[#21005d] dark:bg-[#4a4458] dark:text-[#e8def8]">
                  <update.icon />
                </span>
                <span className="text-base leading-6 font-medium">
                  {update.title}
                </span>
              </CardHeader>
              <CardContent>{update.body}</CardContent>
            </Card>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselControls>
        <CarouselPrevious />
        <CarouselNext />
      </CarouselControls>
    </Carousel>
  );
}
