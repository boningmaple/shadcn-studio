import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  MDButton,
  type MDButtonProps,
} from "@/ui/material-design/components/md-button/md-button";

export const mdFabButtonVariants = tv({
  base: [
    "gap-0 rounded-[16px] p-0",
    "transition-[background-color,border-radius,box-shadow,color,outline-offset,outline-width] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
    "data-disabled:bg-[#1D1B20]/10 data-disabled:text-[#1D1B20]/38 data-disabled:shadow-none",
    "dark:data-disabled:bg-[#E6E0E9]/10 dark:data-disabled:text-[#E6E0E9]/38",
  ],
  variants: {
    color: {
      surface: [
        "bg-[#f7f2fa] text-[#6750a4]",
        "dark:bg-[#211f26] dark:text-[#d0bcff]",
      ],
      primary: [
        "bg-[#eaddff] text-[#21005d]",
        "dark:bg-[#4f378b] dark:text-[#eaddff]",
      ],
      secondary: [
        "bg-[#e8def8] text-[#1d192b]",
        "dark:bg-[#4a4458] dark:text-[#e8def8]",
      ],
      tertiary: [
        "bg-[#ffd8e4] text-[#31111d]",
        "dark:bg-[#633b48] dark:text-[#ffd8e4]",
      ],
    },
    lowered: {
      true: "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
      false:
        "shadow-[0_4px_8px_3px_rgb(0_0_0/0.15),0_1px_3px_0_rgb(0_0_0/0.3)] data-hovered:shadow-[0_6px_10px_4px_rgb(0_0_0/0.15),0_2px_3px_0_rgb(0_0_0/0.3)]",
    },
    size: {
      small: [
        "size-10 rounded-[12px] data-hovered:rounded-[14px] data-pressed:rounded-[10px]",
        "[&_svg:not([class*='size-'])]:size-6",
      ],
      medium: [
        "size-14 rounded-[16px] data-hovered:rounded-[18px] data-pressed:rounded-[14px]",
        "[&_svg:not([class*='size-'])]:size-6",
      ],
      large: [
        "size-24 rounded-[28px] data-hovered:rounded-[32px] data-pressed:rounded-[24px]",
        "[&_svg:not([class*='size-'])]:size-9",
      ],
    },
  },
  defaultVariants: {
    color: "surface",
    lowered: false,
    size: "medium",
  },
});

export type MDFABButtonProps = Omit<
  MDButtonProps,
  "shape" | "size" | "variant"
> &
  VariantProps<typeof mdFabButtonVariants>;

export function MDFABButton({
  className,
  color = "surface",
  lowered = false,
  size = "medium",
  ...props
}: MDFABButtonProps) {
  return (
    <MDButton
      className={composeRenderProps(className, (className) =>
        mdFabButtonVariants({ className, color, lowered, size }),
      )}
      data-color={color}
      data-lowered={lowered}
      data-slot="fab-button"
      shape="square"
      size="md"
      variant="filled"
      {...props}
    />
  );
}
