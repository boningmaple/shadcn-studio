import type * as React from "react";
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  Toolbar as RACToolbar,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const mdButtonGroupStyles = tv({
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

export type MDButtonGroupVariantProps = VariantProps<
  typeof mdButtonGroupStyles
>;

export type MDButtonGroupProps = React.ComponentPropsWithRef<
  typeof RACToolbar
> &
  MDButtonGroupVariantProps;

export function MDButtonGroup({
  className,
  spacing = "comfortable",
  wrap = true,
  ...props
}: MDButtonGroupProps) {
  return (
    <RACToolbar
      className={composeRenderProps(className, (className) =>
        mdButtonGroupStyles({ className, spacing, wrap }),
      )}
      data-slot="button-group"
      data-spacing={spacing}
      {...props}
    />
  );
}

export const mdToggleButtonGroupStyles = tv({
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

export type MDToggleButtonGroupVariantProps = VariantProps<
  typeof mdToggleButtonGroupStyles
>;

export type MDToggleButtonGroupProps = React.ComponentPropsWithRef<
  typeof RACToggleButtonGroup
> &
  MDToggleButtonGroupVariantProps;

export function MDToggleButtonGroup({
  className,
  spacing = "comfortable",
  wrap = true,
  ...props
}: MDToggleButtonGroupProps) {
  return (
    <RACToggleButtonGroup
      className={composeRenderProps(className, (className) =>
        mdToggleButtonGroupStyles({ className, spacing, wrap }),
      )}
      data-slot="toggle-button-group"
      data-spacing={spacing}
      {...props}
    />
  );
}
