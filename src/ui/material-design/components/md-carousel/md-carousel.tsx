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
  type CarouselApi as MDCarouselApi,
  CarouselContent as BaseCarouselContent,
  CarouselItem as BaseCarouselItem,
  useCarousel,
} from "@/ui/shadcn/react-aria/carousel";
import {
  MDIconButton,
  type MDIconButtonProps,
} from "@/ui/material-design/components/md-icon-button/md-icon-button";
import { cn } from "@/lib/utils";

export const mdCarouselStyles = tv({
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

type CarouselVariantProps = VariantProps<typeof mdCarouselStyles>;

export type MDCarouselProps = React.ComponentPropsWithRef<typeof BaseCarousel>;

export function MDCarousel({ className, opts, ...props }: MDCarouselProps) {
  const { root } = mdCarouselStyles();

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

export type MDCarouselContentProps = React.ComponentPropsWithRef<
  typeof BaseCarouselContent
> &
  Pick<CarouselVariantProps, "spacing">;

export function MDCarouselContent({
  className,
  spacing = "md",
  ...props
}: MDCarouselContentProps) {
  const { orientation } = useCarousel();
  const { content } = mdCarouselStyles({ orientation, spacing });

  return (
    <BaseCarouselContent
      className={content({ className })}
      data-spacing={spacing}
      {...props}
    />
  );
}

export type MDCarouselItemProps = React.ComponentPropsWithRef<
  typeof BaseCarouselItem
> &
  Pick<CarouselVariantProps, "size">;

export function MDCarouselItem({
  className,
  size = "browse",
  ...props
}: MDCarouselItemProps) {
  const { orientation } = useCarousel();
  const { item } = mdCarouselStyles({ orientation, size });

  return (
    <BaseCarouselItem
      className={item({ className })}
      data-size={size}
      {...props}
    />
  );
}

export type MDCarouselControlsProps = React.ComponentPropsWithRef<"div">;

export function MDCarouselControls({
  className,
  ...props
}: MDCarouselControlsProps) {
  const { controls } = mdCarouselStyles();

  return (
    <div
      className={cn(controls(), className)}
      data-slot="carousel-controls"
      {...props}
    />
  );
}

export type MDCarouselControlProps = Omit<MDIconButtonProps, "children">;

export function MDCarouselPrevious({
  className,
  variant = "tonal",
  size = "sm",
  width = "default",
  ...props
}: MDCarouselControlProps) {
  const { orientation, scrollPrev, canScrollPrev } = useCarousel();
  const { control } = mdCarouselStyles();
  const PreviousIcon =
    orientation === "vertical" ? ChevronUpIcon : ChevronLeftIcon;

  return (
    <MDIconButton
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
    </MDIconButton>
  );
}

export function MDCarouselNext({
  className,
  variant = "tonal",
  size = "sm",
  width = "default",
  ...props
}: MDCarouselControlProps) {
  const { orientation, scrollNext, canScrollNext } = useCarousel();
  const { control } = mdCarouselStyles();
  const NextIcon =
    orientation === "vertical" ? ChevronDownIcon : ChevronRightIcon;

  return (
    <MDIconButton
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
    </MDIconButton>
  );
}

export { type MDCarouselApi };
