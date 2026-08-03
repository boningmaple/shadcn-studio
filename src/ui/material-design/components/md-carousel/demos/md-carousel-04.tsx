import { ListChecksIcon, SparklesIcon, UsersRoundIcon } from "lucide-react";

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

export default function MDCarouselDemo() {
  return (
    <MDCarousel
      aria-label="Project updates"
      className="max-w-2xl"
      orientation="vertical"
    >
      <MDCarouselContent>
        {updates.map((update) => (
          <MDCarouselItem key={update.title} size="supporting">
            <MDCard className="h-full" interactive variant="outlined">
              <MDCardHeader>
                <span className="flex size-12 items-center justify-center rounded-[16px] bg-[#e8def8] text-[#21005d] dark:bg-[#4a4458] dark:text-[#e8def8]">
                  <update.icon />
                </span>
                <span className="text-base leading-6 font-medium">
                  {update.title}
                </span>
              </MDCardHeader>
              <MDCardContent>{update.body}</MDCardContent>
            </MDCard>
          </MDCarouselItem>
        ))}
      </MDCarouselContent>
      <MDCarouselControls>
        <MDCarouselPrevious />
        <MDCarouselNext />
      </MDCarouselControls>
    </MDCarousel>
  );
}
