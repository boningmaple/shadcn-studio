import { ListChecksIcon, SparklesIcon, UsersRoundIcon } from "lucide-react";

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

export default function M3CarouselDemo() {
  return (
    <M3Carousel
      aria-label="Project updates"
      className="max-w-2xl"
      orientation="vertical"
    >
      <M3CarouselContent>
        {updates.map((update) => (
          <M3CarouselItem key={update.title} size="supporting">
            <M3Card className="h-full" interactive variant="outlined">
              <M3CardHeader>
                <span className="flex size-12 items-center justify-center rounded-[16px] bg-[#e8def8] text-[#21005d] dark:bg-[#4a4458] dark:text-[#e8def8]">
                  <update.icon />
                </span>
                <span className="text-base leading-6 font-medium">
                  {update.title}
                </span>
              </M3CardHeader>
              <M3CardContent>{update.body}</M3CardContent>
            </M3Card>
          </M3CarouselItem>
        ))}
      </M3CarouselContent>
      <M3CarouselControls>
        <M3CarouselPrevious />
        <M3CarouselNext />
      </M3CarouselControls>
    </M3Carousel>
  );
}
