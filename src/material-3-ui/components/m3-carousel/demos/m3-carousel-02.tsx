import {
  M3Carousel,
  M3CarouselContent,
  M3CarouselControls,
  M3CarouselItem,
  M3CarouselNext,
  M3CarouselPrevious,
} from "@/material-3-ui/components/m3-carousel/m3-carousel";

const features = [
  {
    title: "Morning plan",
    body: "A quiet overview for the first decisions of the day.",
    color: "bg-[#d8e2ff] text-[#001a41]",
  },
  {
    title: "Studio review",
    body: "Collected notes, pinned assets, and work ready for critique.",
    color: "bg-[#d7f7ee] text-[#002019]",
  },
  {
    title: "Evening handoff",
    body: "A compact closing pass with owners and next actions.",
    color: "bg-[#ffdad6] text-[#410002]",
  },
] as const;

export default function M3CarouselDemo() {
  return (
    <M3Carousel aria-label="Feature highlights" className="max-w-4xl">
      <M3CarouselContent spacing="lg">
        {features.map((feature) => (
          <M3CarouselItem key={feature.title} size="hero">
            <section
              className={`flex min-h-80 flex-col justify-end overflow-hidden rounded-[28px] p-6 shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] sm:p-8 ${feature.color}`}
            >
              <div className="max-w-md">
                <p className="text-sm leading-5 font-medium opacity-80">
                  Featured workflow
                </p>
                <h3 className="mt-2 text-3xl leading-10 font-semibold tracking-normal">
                  {feature.title}
                </h3>
                <p className="mt-3 text-base leading-7">{feature.body}</p>
              </div>
            </section>
          </M3CarouselItem>
        ))}
      </M3CarouselContent>
      <M3CarouselControls className="absolute right-4 bottom-4 mt-0 justify-end">
        <M3CarouselPrevious
          className="text-[#21005d]"
          variant="tonal"
          width="narrow"
        />
        <M3CarouselNext
          className="text-[#21005d]"
          variant="tonal"
          width="narrow"
        />
      </M3CarouselControls>
    </M3Carousel>
  );
}
