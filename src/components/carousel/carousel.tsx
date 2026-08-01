"use client";

import type * as React from "react";
import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";
import {
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronUpIcon,
} from "lucide-react";

import {
  Carousel as BaseCarousel,
  CarouselContent as BaseCarouselContent,
  CarouselItem as BaseCarouselItem,
  type CarouselApi,
  useCarousel,
} from "@/components/ui/carousel";
import {
  IconButton,
  type IconButtonProps,
} from "@/components/icon-button/icon-button";
import { cn } from "@/lib/utils";

export const carouselStyles = tv({
  slots: {
    root: "relative w-full text-[#1d1b20] dark:text-[#e6e0e9]",
    content: "gap-3",
    item: "min-w-0",
    controls: "mt-4 flex items-center justify-center gap-2",
    control: "z-10",
  },
  variants: {
    orientation: {
      horizontal: {
        content: "ml-0",
        item: "pl-0",
      },
      vertical: {
        content: "mt-0 h-100 flex-col",
        item: "pt-0",
      },
    },
    size: {
      browse: {
        item: "basis-[78%] sm:basis-[44%] lg:basis-[31%]",
      },
      compact: {
        item: "basis-[56%] sm:basis-[32%] lg:basis-[22%]",
      },
      hero: {
        item: "basis-full",
      },
      supporting: {
        item: "basis-[88%] sm:basis-[58%] lg:basis-[42%]",
      },
    },
    spacing: {
      sm: {
        content: "gap-2",
      },
      md: {
        content: "gap-3",
      },
      lg: {
        content: "gap-4",
      },
    },
  },
  compoundVariants: [
    {
      orientation: "vertical",
      size: ["browse", "compact", "supporting"],
      class: {
        item: "basis-[72%]",
      },
    },
  ],
  defaultVariants: {
    orientation: "horizontal",
    size: "browse",
    spacing: "md",
  },
});

type CarouselVariantProps = VariantProps<typeof carouselStyles>;

export type CarouselProps = React.ComponentPropsWithRef<typeof BaseCarousel>;

export function Carousel({ className, opts, ...props }: CarouselProps) {
  const { root } = carouselStyles();

  return (
    <BaseCarousel
      className={root({ className })}
      opts={{
        align: "start",
        containScroll: "trimSnaps",
        ...opts,
      }}
      {...props}
    />
  );
}

export type CarouselContentProps = React.ComponentPropsWithRef<
  typeof BaseCarouselContent
> &
  Pick<CarouselVariantProps, "spacing">;

export function CarouselContent({
  className,
  spacing = "md",
  ...props
}: CarouselContentProps) {
  const { orientation } = useCarousel();
  const { content } = carouselStyles({ orientation, spacing });

  return (
    <BaseCarouselContent
      className={content({ className })}
      data-spacing={spacing}
      {...props}
    />
  );
}

export type CarouselItemProps = React.ComponentPropsWithRef<
  typeof BaseCarouselItem
> &
  Pick<CarouselVariantProps, "size">;

export function CarouselItem({
  className,
  size = "browse",
  ...props
}: CarouselItemProps) {
  const { orientation } = useCarousel();
  const { item } = carouselStyles({ orientation, size });

  return (
    <BaseCarouselItem
      className={item({ className })}
      data-size={size}
      {...props}
    />
  );
}

export type CarouselControlsProps = React.ComponentPropsWithRef<"div">;

export function CarouselControls({
  className,
  ...props
}: CarouselControlsProps) {
  const { controls } = carouselStyles();

  return (
    <div
      className={cn(controls(), className)}
      data-slot="carousel-controls"
      {...props}
    />
  );
}

export type CarouselControlProps = Omit<IconButtonProps, "children">;

export function CarouselPrevious({
  className,
  variant = "tonal",
  size = "sm",
  width = "default",
  ...props
}: CarouselControlProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  const { control } = carouselStyles();
  const PreviousIcon =
    orientation === "vertical" ? ChevronUpIcon : ChevronLeftIcon;

  return (
    <IconButton
      aria-label="Previous slide"
      className={composeRenderProps(className, (className) =>
        control({ className }),
      )}
      isDisabled={!canScrollPrev}
      onPress={scrollPrev}
      size={size}
      variant={variant}
      width={width}
      {...props}
    >
      <PreviousIcon />
    </IconButton>
  );
}

export function CarouselNext({
  className,
  variant = "tonal",
  size = "sm",
  width = "default",
  ...props
}: CarouselControlProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  const { control } = carouselStyles();
  const NextIcon =
    orientation === "vertical" ? ChevronDownIcon : ChevronRightIcon;

  return (
    <IconButton
      aria-label="Next slide"
      className={composeRenderProps(className, (className) =>
        control({ className }),
      )}
      isDisabled={!canScrollNext}
      onPress={scrollNext}
      size={size}
      variant={variant}
      width={width}
      {...props}
    >
      <NextIcon />
    </IconButton>
  );
}

export { type CarouselApi };
