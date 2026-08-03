import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  M3Button,
  type M3ButtonProps,
} from "@/material-3-ui/components/m3-button/m3-button";
import {
  M3ToggleButton,
  type M3ToggleButtonProps,
} from "@/material-3-ui/components/m3-toggle-button/m3-toggle-button";
import { cn } from "@/lib/utils";

export const m3IconButtonVariants = tv({
  slots: {
    root: [
      "group/icon-button inline-flex h-auto w-fit min-w-12 shrink-0 items-center justify-center overflow-visible border-0 bg-transparent p-0 text-inherit shadow-none outline-0 before:hidden",
      "data-disabled:bg-transparent data-disabled:text-inherit",
      "dark:data-disabled:bg-transparent dark:data-disabled:text-inherit",
    ],
    surface: [
      "relative isolate inline-flex shrink-0 items-center justify-center overflow-hidden border border-transparent outline-0 outline-solid outline-offset-0 outline-transparent select-none",
      "transition-[background-color,border-color,border-radius,color,outline-offset,outline-width] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-hovered/icon-button:before:opacity-[0.08]",
      "group-data-focus-visible/icon-button:before:opacity-[0.1]",
      "group-data-pressed/icon-button:before:opacity-[0.1]",
      "group-data-focus-visible/icon-button:outline-2 group-data-focus-visible/icon-button:outline-solid group-data-focus-visible/icon-button:outline-offset-2 group-data-focus-visible/icon-button:outline-[#6750a4]",
      "dark:group-data-focus-visible/icon-button:outline-[#d0bcff]",
      "group-data-disabled/icon-button:text-[#1D1B20]/38 group-data-disabled/icon-button:before:opacity-0",
      "dark:group-data-disabled/icon-button:text-[#E6E0E9]/38",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
      "[&_svg]:pointer-events-none [&_svg]:shrink-0",
    ],
  },
  variants: {
    kind: {
      default: {},
      toggle: {},
    },
    variant: {
      filled: {
        surface: [
          "bg-[#6750a4] text-white",
          "dark:bg-[#d0bcff] dark:text-[#381e72]",
          "group-data-disabled/icon-button:bg-[#1D1B20]/10",
          "dark:group-data-disabled/icon-button:bg-[#E6E0E9]/10",
        ],
      },
      tonal: {
        surface: [
          "bg-[#e8def8] text-[#1d192b]",
          "dark:bg-[#4a4458] dark:text-[#e8def8]",
          "group-data-disabled/icon-button:bg-[#1D1B20]/10",
          "dark:group-data-disabled/icon-button:bg-[#E6E0E9]/10",
        ],
      },
      outlined: {
        surface: [
          "bg-transparent",
          "border-[#cac4d0] text-[#49454f]",
          "group-data-disabled/icon-button:border-[#1D1B20]/12",
          "dark:border-[#49454f] dark:text-[#cac4d0]",
          "dark:group-data-disabled/icon-button:border-[#E6E0E9]/12",
        ],
      },
      standard: {
        surface: ["bg-transparent text-[#49454f]", "dark:text-[#cac4d0]"],
      },
    },
    size: {
      xs: {
        root: "min-h-12",
        surface: [
          "h-8 group-data-pressed/icon-button:rounded-[8px]",
          "[&_svg:not([class*='size-'])]:size-5",
        ],
      },
      sm: {
        root: "min-h-12",
        surface: [
          "h-10 group-data-pressed/icon-button:rounded-[8px]",
          "[&_svg:not([class*='size-'])]:size-6",
        ],
      },
      md: {
        root: "min-h-14",
        surface: [
          "h-14 group-data-pressed/icon-button:rounded-[12px]",
          "[&_svg:not([class*='size-'])]:size-6",
        ],
      },
      lg: {
        root: "min-h-24",
        surface: [
          "h-24 border-2 group-data-pressed/icon-button:rounded-[16px]",
          "[&_svg:not([class*='size-'])]:size-8",
        ],
      },
      xl: {
        root: "min-h-34",
        surface: [
          "h-34 border-[3px] group-data-pressed/icon-button:rounded-[16px]",
          "[&_svg:not([class*='size-'])]:size-10",
        ],
      },
    },
    width: {
      narrow: {},
      default: {},
      wide: {},
    },
    shape: {
      round: {
        surface: "rounded-full",
      },
      square: {},
    },
  },
  compoundVariants: [
    { size: "xs", width: "narrow", class: { surface: "w-7" } },
    { size: "xs", width: "default", class: { surface: "w-8" } },
    { size: "xs", width: "wide", class: { surface: "w-10" } },
    { size: "sm", width: "narrow", class: { surface: "w-8" } },
    { size: "sm", width: "default", class: { surface: "w-10" } },
    { size: "sm", width: "wide", class: { surface: "w-13" } },
    { size: "md", width: "narrow", class: { surface: "w-12" } },
    { size: "md", width: "default", class: { surface: "w-14" } },
    { size: "md", width: "wide", class: { surface: "w-18" } },
    { size: "lg", width: "narrow", class: { surface: "w-18" } },
    { size: "lg", width: "default", class: { surface: "w-24" } },
    { size: "lg", width: "wide", class: { surface: "w-32" } },
    { size: "xl", width: "narrow", class: { surface: "w-26" } },
    { size: "xl", width: "default", class: { surface: "w-34" } },
    { size: "xl", width: "wide", class: { surface: "w-46" } },
    {
      size: ["xs", "sm"],
      shape: "square",
      class: { surface: "rounded-[12px]" },
    },
    {
      size: "md",
      shape: "square",
      class: { surface: "rounded-[16px]" },
    },
    {
      size: ["lg", "xl"],
      shape: "square",
      class: { surface: "rounded-[28px]" },
    },
    {
      kind: "toggle",
      variant: "filled",
      class: {
        surface: [
          "bg-[#f3edf7] text-[#49454f]",
          "group-data-selected/icon-button:bg-[#6750a4] group-data-selected/icon-button:text-white",
          "dark:bg-[#211f26] dark:text-[#cac4d0]",
          "dark:group-data-selected/icon-button:bg-[#d0bcff] dark:group-data-selected/icon-button:text-[#381e72]",
        ],
      },
    },
    {
      kind: "toggle",
      variant: "tonal",
      class: {
        surface: [
          "group-data-selected/icon-button:bg-[#625b71] group-data-selected/icon-button:text-white",
          "dark:group-data-selected/icon-button:bg-[#ccc2dc] dark:group-data-selected/icon-button:text-[#332d41]",
        ],
      },
    },
    {
      kind: "toggle",
      variant: "outlined",
      class: {
        surface: [
          "group-data-selected/icon-button:border-transparent group-data-selected/icon-button:bg-[#322f35] group-data-selected/icon-button:text-[#f5eff7]",
          "dark:group-data-selected/icon-button:bg-[#e6e0e9] dark:group-data-selected/icon-button:text-[#322f35]",
          "group-data-selected/icon-button:group-data-disabled/icon-button:border-transparent",
        ],
      },
    },
    {
      kind: "toggle",
      variant: "standard",
      class: {
        surface: [
          "group-data-selected/icon-button:text-[#6750a4]",
          "dark:group-data-selected/icon-button:text-[#d0bcff]",
        ],
      },
    },
    {
      kind: "toggle",
      size: ["xs", "sm"],
      shape: "round",
      class: {
        surface:
          "group-data-selected/icon-button:rounded-[12px] group-data-selected/icon-button:group-data-pressed/icon-button:rounded-[8px]",
      },
    },
    {
      kind: "toggle",
      size: "md",
      shape: "round",
      class: {
        surface:
          "group-data-selected/icon-button:rounded-[16px] group-data-selected/icon-button:group-data-pressed/icon-button:rounded-[12px]",
      },
    },
    {
      kind: "toggle",
      size: ["lg", "xl"],
      shape: "round",
      class: {
        surface:
          "group-data-selected/icon-button:rounded-[28px] group-data-selected/icon-button:group-data-pressed/icon-button:rounded-[16px]",
      },
    },
    {
      kind: "toggle",
      size: ["xs", "sm"],
      shape: "square",
      class: {
        surface:
          "group-data-selected/icon-button:rounded-full group-data-selected/icon-button:group-data-pressed/icon-button:rounded-[8px]",
      },
    },
    {
      kind: "toggle",
      size: "md",
      shape: "square",
      class: {
        surface:
          "group-data-selected/icon-button:rounded-full group-data-selected/icon-button:group-data-pressed/icon-button:rounded-[12px]",
      },
    },
    {
      kind: "toggle",
      size: ["lg", "xl"],
      shape: "square",
      class: {
        surface:
          "group-data-selected/icon-button:rounded-full group-data-selected/icon-button:group-data-pressed/icon-button:rounded-[16px]",
      },
    },
  ],
  defaultVariants: {
    kind: "default",
    variant: "filled",
    size: "sm",
    width: "default",
    shape: "round",
  },
});

type IconButtonStyleProps = VariantProps<typeof m3IconButtonVariants>;

export type M3IconButtonProps = Omit<
  M3ButtonProps,
  "children" | "shape" | "size" | "variant"
> &
  Omit<IconButtonStyleProps, "kind"> & {
    children: M3ButtonProps["children"];
  };

export function M3IconButton({
  className,
  children,
  variant = "filled",
  size = "sm",
  width = "default",
  shape = "round",
  ...props
}: M3IconButtonProps) {
  const styles = m3IconButtonVariants({
    kind: "default",
    variant,
    size,
    width,
    shape,
  });
  const rootClassName = styles.root();
  const surfaceClassName = styles.surface();

  return (
    <M3Button
      className={composeRenderProps(className, (className) =>
        cn(rootClassName, className),
      )}
      data-shape={shape}
      data-size={size}
      data-variant={variant}
      data-width={width}
      shape="round"
      size="sm"
      variant="text"
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <span className={surfaceClassName} data-slot="icon-button-surface">
          {children}
        </span>
      ))}
    </M3Button>
  );
}

export type M3ToggleIconButtonProps = Omit<
  M3ToggleButtonProps,
  "children" | "shape" | "size" | "variant"
> &
  Omit<IconButtonStyleProps, "kind"> & {
    children: M3ToggleButtonProps["children"];
  };

export function M3ToggleIconButton({
  className,
  children,
  variant = "filled",
  size = "sm",
  width = "default",
  shape = "round",
  ...props
}: M3ToggleIconButtonProps) {
  const styles = m3IconButtonVariants({
    kind: "toggle",
    variant,
    size,
    width,
    shape,
  });
  const rootClassName = styles.root();
  const surfaceClassName = styles.surface();

  return (
    <M3ToggleButton
      className={composeRenderProps(className, (className) =>
        cn(rootClassName, className),
      )}
      data-shape={shape}
      data-size={size}
      data-variant={variant}
      data-width={width}
      shape="round"
      size="sm"
      variant="filled"
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <span className={surfaceClassName} data-slot="icon-button-surface">
          {children}
        </span>
      ))}
    </M3ToggleButton>
  );
}
