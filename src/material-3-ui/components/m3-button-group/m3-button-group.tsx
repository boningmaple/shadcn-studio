import type * as React from "react";
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  Toolbar as RACToolbar,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const m3ButtonGroupStyles = tv({
  base: [
    "inline-flex w-fit max-w-full items-center justify-center rounded-full",
    "outline-none",
    "data-[orientation=vertical]:flex-col",
  ],
  variants: {
    spacing: {
      compact: "gap-1",
      comfortable: "gap-2",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    spacing: "comfortable",
    wrap: true,
  },
});

export type M3ButtonGroupVariantProps = VariantProps<
  typeof m3ButtonGroupStyles
>;

export type M3ButtonGroupProps = React.ComponentPropsWithRef<
  typeof RACToolbar
> &
  M3ButtonGroupVariantProps;

export function M3ButtonGroup({
  className,
  spacing = "comfortable",
  wrap = true,
  ...props
}: M3ButtonGroupProps) {
  return (
    <RACToolbar
      className={composeRenderProps(className, (className) =>
        m3ButtonGroupStyles({ className, spacing, wrap }),
      )}
      data-slot="button-group"
      data-spacing={spacing}
      {...props}
    />
  );
}

export const m3ToggleButtonGroupStyles = tv({
  base: [
    "inline-flex w-fit max-w-full items-center justify-center rounded-full",
    "outline-none",
    "data-[orientation=vertical]:flex-col",
  ],
  variants: {
    spacing: {
      compact: "gap-1",
      comfortable: "gap-2",
    },
    wrap: {
      true: "flex-wrap",
      false: "flex-nowrap",
    },
  },
  defaultVariants: {
    spacing: "comfortable",
    wrap: true,
  },
});

export type M3ToggleButtonGroupVariantProps = VariantProps<
  typeof m3ToggleButtonGroupStyles
>;

export type M3ToggleButtonGroupProps = React.ComponentPropsWithRef<
  typeof RACToggleButtonGroup
> &
  M3ToggleButtonGroupVariantProps;

export function M3ToggleButtonGroup({
  className,
  spacing = "comfortable",
  wrap = true,
  ...props
}: M3ToggleButtonGroupProps) {
  return (
    <RACToggleButtonGroup
      className={composeRenderProps(className, (className) =>
        m3ToggleButtonGroupStyles({ className, spacing, wrap }),
      )}
      data-slot="toggle-button-group"
      data-spacing={spacing}
      {...props}
    />
  );
}
