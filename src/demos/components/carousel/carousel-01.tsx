import { CalendarDaysIcon, Clock3Icon, MapPinIcon } from "lucide-react";

import {
  Carousel,
  CarouselContent,
  CarouselControls,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/carousel/carousel";
import { Card, CardContent, CardHeader } from "@/components/card/card";

const trips = [
  {
    title: "Nordic coast",
    meta: "5 days",
    color: "bg-[#c4e7ff] text-[#001f2a]",
    detail: "Harbor walks, cold-water spas, and late ferry dinners.",
  },
  {
    title: "Desert bloom",
    meta: "3 days",
    color: "bg-[#ffd8e4] text-[#31111d]",
    detail: "Morning hikes, quiet galleries, and dusk observatory tickets.",
  },
  {
    title: "Kyoto lanes",
    meta: "7 days",
    color: "bg-[#d0f8ce] text-[#0f2511]",
    detail: "Garden routes, tea houses, and neighborhood ramen stops.",
  },
  {
    title: "Lake studios",
    meta: "4 days",
    color: "bg-[#eaddff] text-[#21005d]",
    detail: "Open workshops, canoe paths, and a lakeside ceramics class.",
  },
  {
    title: "City weekender",
    meta: "2 days",
    color: "bg-[#ffe8a3] text-[#271900]",
    detail: "Design shops, jazz rooms, and a slow Sunday market.",
  },
] as const;

export default function CarouselDemo() {
  return (
    <Carousel aria-label="Travel collections" className="max-w-4xl">
      <CarouselContent>
        {trips.map((trip) => (
          <CarouselItem key={trip.title}>
            <Card className="h-full" interactive variant="elevated">
              <div
                className={`flex h-36 items-end rounded-t-[12px] p-4 ${trip.color}`}
              >
                <MapPinIcon className="size-8" />
              </div>
              <CardHeader>
                <span className="text-base leading-6 font-medium">
                  {trip.title}
                </span>
                <span className="flex items-center gap-1 text-sm text-[#6750a4] dark:text-[#d0bcff]">
                  <CalendarDaysIcon className="size-4" />
                  {trip.meta}
                </span>
              </CardHeader>
              <CardContent>
                <span className="mb-3 flex items-center gap-1 text-xs font-medium tracking-normal text-[#49454f] uppercase dark:text-[#cac4d0]">
                  <Clock3Icon className="size-3.5" />
                  Curated itinerary
                </span>
                {trip.detail}
              </CardContent>
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
