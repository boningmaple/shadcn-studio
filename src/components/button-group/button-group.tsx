import type * as React from "react";
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  Toolbar as RACToolbar,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const buttonGroupStyles = tv({
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

export type ButtonGroupVariantProps = VariantProps<typeof buttonGroupStyles>;

export type ButtonGroupProps = React.ComponentPropsWithRef<typeof RACToolbar> &
  ButtonGroupVariantProps;

export function ButtonGroup({
  className,
  spacing = "comfortable",
  wrap = true,
  ...props
}: ButtonGroupProps) {
  return (
    <RACToolbar
      className={composeRenderProps(className, (className) =>
        buttonGroupStyles({ className, spacing, wrap }),
      )}
      data-slot="button-group"
      data-spacing={spacing}
      {...props}
    />
  );
}

export const toggleButtonGroupStyles = tv({
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

export type ToggleButtonGroupVariantProps = VariantProps<
  typeof toggleButtonGroupStyles
>;

export type ToggleButtonGroupProps = React.ComponentPropsWithRef<
  typeof RACToggleButtonGroup
> &
  ToggleButtonGroupVariantProps;

export function ToggleButtonGroup({
  className,
  spacing = "comfortable",
  wrap = true,
  ...props
}: ToggleButtonGroupProps) {
  return (
    <RACToggleButtonGroup
      className={composeRenderProps(className, (className) =>
        toggleButtonGroupStyles({ className, spacing, wrap }),
      )}
      data-slot="toggle-button-group"
      data-spacing={spacing}
      {...props}
    />
  );
}
