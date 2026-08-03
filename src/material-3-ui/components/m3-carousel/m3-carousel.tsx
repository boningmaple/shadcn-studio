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
  type CarouselApi as M3CarouselApi,
  CarouselContent as BaseCarouselContent,
  CarouselItem as BaseCarouselItem,
  useCarousel,
} from "@/components/ui/carousel";
import {
  M3IconButton,
  type M3IconButtonProps,
} from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import { cn } from "@/lib/utils";

export const m3CarouselStyles = tv({
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

type CarouselVariantProps = VariantProps<typeof m3CarouselStyles>;

export type M3CarouselProps = React.ComponentPropsWithRef<typeof BaseCarousel>;

export function M3Carousel({ className, opts, ...props }: M3CarouselProps) {
  const { root } = m3CarouselStyles();

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

export type M3CarouselContentProps = React.ComponentPropsWithRef<
  typeof BaseCarouselContent
> &
  Pick<CarouselVariantProps, "spacing">;

export function M3CarouselContent({
  className,
  spacing = "md",
  ...props
}: M3CarouselContentProps) {
  const { orientation } = useCarousel();
  const { content } = m3CarouselStyles({ orientation, spacing });

  return (
    <BaseCarouselContent
      className={content({ className })}
      data-spacing={spacing}
      {...props}
    />
  );
}

export type M3CarouselItemProps = React.ComponentPropsWithRef<
  typeof BaseCarouselItem
> &
  Pick<CarouselVariantProps, "size">;

export function M3CarouselItem({
  className,
  size = "browse",
  ...props
}: M3CarouselItemProps) {
  const { orientation } = useCarousel();
  const { item } = m3CarouselStyles({ orientation, size });

  return (
    <BaseCarouselItem
      className={item({ className })}
      data-size={size}
      {...props}
    />
  );
}

export type M3CarouselControlsProps = React.ComponentPropsWithRef<"div">;

export function M3CarouselControls({
  className,
  ...props
}: M3CarouselControlsProps) {
  const { controls } = m3CarouselStyles();

  return (
    <div
      className={cn(controls(), className)}
      data-slot="carousel-controls"
      {...props}
    />
  );
}

export type M3CarouselControlProps = Omit<M3IconButtonProps, "children">;

export function M3CarouselPrevious({
  className,
  variant = "tonal",
  size = "sm",
  width = "default",
  ...props
}: M3CarouselControlProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  const { control } = m3CarouselStyles();
  const PreviousIcon =
    orientation === "vertical" ? ChevronUpIcon : ChevronLeftIcon;

  return (
    <M3IconButton
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
    </M3IconButton>
  );
}

export function M3CarouselNext({
  className,
  variant = "tonal",
  size = "sm",
  width = "default",
  ...props
}: M3CarouselControlProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  const { control } = m3CarouselStyles();
  const NextIcon =
    orientation === "vertical" ? ChevronDownIcon : ChevronRightIcon;

  return (
    <M3IconButton
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
    </M3IconButton>
  );
}

export { type M3CarouselApi };
