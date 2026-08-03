import type * as React from "react";
import { Button as RACButton, composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const mdButtonVariants = tv({
  base: [
    "relative inline-flex shrink-0 items-center justify-center overflow-hidden border border-transparent whitespace-nowrap outline-0 outline-solid outline-offset-0 outline-transparent select-none",
    "transition-[background-color,border-color,border-radius,box-shadow,color,outline-offset,outline-width] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
    "before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
    "data-hovered:before:opacity-[0.08]",
    "data-focus-visible:before:opacity-[0.1]",
    "data-pressed:before:opacity-[0.1]",
    "data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-2 data-focus-visible:outline-[#6750a4]",
    "data-focus-visible:duration-600 data-focus-visible:ease-[linear(0,2_25%,1_100%)]",
    "dark:data-focus-visible:outline-[#d0bcff]",
    "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:before:opacity-0",
    "data-disabled:bg-[#1D1B20]/10 data-disabled:text-[#1D1B20]/38 data-disabled:shadow-none",
    "dark:data-disabled:bg-[#E6E0E9]/10 dark:data-disabled:text-[#E6E0E9]/38",
    "data-pending:cursor-wait data-pending:before:opacity-0",
    "motion-reduce:transition-none motion-reduce:before:transition-none",
    "[&_svg]:pointer-events-none [&_svg]:shrink-0",
  ],
  variants: {
    variant: {
      elevated: [
        "bg-[#f7f2fa] text-[#6750a4]",
        "dark:bg-[#1d1b20] dark:text-[#d0bcff]",
        "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
        "data-hovered:shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]",
      ],
      filled: [
        "bg-[#6750a4] text-white",
        "dark:bg-[#d0bcff] dark:text-[#381e72]",
      ],
      tonal: [
        "bg-[#e8def8] text-[#1d192b]",
        "dark:bg-[#4a4458] dark:text-[#e8def8]",
      ],
      outlined: [
        "bg-transparent",
        "border-[#cac4d0] text-[#49454f]",
        "data-disabled:border-[#1D1B20]/12",
        "dark:border-[#49454f] dark:text-[#cac4d0]",
        "dark:data-disabled:border-[#E6E0E9]/12",
      ],
      text: ["bg-transparent", "text-[#6750a4]", "dark:text-[#d0bcff]"],
    },
    size: {
      xs: [
        "h-8 gap-1 px-3 text-sm leading-5 font-medium",
        "data-pressed:rounded-[8px]",
        "[&_svg:not([class*='size-'])]:size-5",
      ],
      sm: [
        "h-10 gap-2 px-4 text-sm leading-5 font-medium",
        "data-pressed:rounded-[8px]",
        "[&_svg:not([class*='size-'])]:size-5",
      ],
      md: [
        "h-14 gap-2 px-6 text-base leading-6 font-medium",
        "data-pressed:rounded-[12px]",
        "[&_svg:not([class*='size-'])]:size-6",
      ],
      lg: [
        "h-24 gap-3 border-2 px-12 text-2xl leading-8 font-normal",
        "data-pressed:rounded-[16px]",
        "[&_svg:not([class*='size-'])]:size-8",
      ],
      xl: [
        "h-34 gap-4 border-[3px] px-16 text-[2rem] leading-10 font-normal",
        "data-pressed:rounded-[16px]",
        "[&_svg:not([class*='size-'])]:size-10",
      ],
    },
    shape: {
      round: "rounded-full",
      square: "",
    },
  },
  compoundVariants: [
    { size: ["xs", "sm"], shape: "square", class: "rounded-[12px]" },
    { size: "md", shape: "square", class: "rounded-[16px]" },
    { size: ["lg", "xl"], shape: "square", class: "rounded-[28px]" },
  ],
  defaultVariants: {
    variant: "filled",
    size: "sm",
    shape: "round",
  },
});

export type MDButtonProps = React.ComponentPropsWithRef<typeof RACButton> &
  VariantProps<typeof mdButtonVariants>;

export function MDButton({
  className,
  variant = "filled",
  size = "sm",
  shape = "round",
  ...props
}: MDButtonProps) {
  return (
    <RACButton
      data-slot="button"
      data-variant={variant}
      data-size={size}
      data-shape={shape}
      className={composeRenderProps(className, (className) =>
        mdButtonVariants({ variant, size, shape, className }),
      )}
      {...props}
    />
  );
}
