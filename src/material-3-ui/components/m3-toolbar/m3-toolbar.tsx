import type * as React from "react";
import {
  Group as RACGroup,
  Toolbar as RACToolbar,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  M3Divider,
  type M3DividerProps,
} from "@/material-3-ui/components/m3-divider/m3-divider";

export const m3ToolbarStyles = tv({
  slots: {
    root: [
      "flex w-full max-w-full items-center gap-2 overflow-hidden bg-[#fffbfe] text-[#1d1b20]",
      "dark:bg-[#1d1b20] dark:text-[#e6e0e9]",
    ],
    group: "flex min-w-0 items-center gap-1",
    title:
      "font-heading min-w-0 truncate text-xl leading-7 font-normal tracking-normal text-[#1d1b20] dark:text-[#e6e0e9]",
    spacer: "min-w-0 flex-1",
    divider: "mx-1 h-8",
  },
  variants: {
    density: {
      compact: {
        root: "min-h-14 px-2 py-1",
      },
      comfortable: {
        root: "min-h-16 px-3 py-2",
      },
    },
    elevation: {
      flat: {
        root: "shadow-none",
      },
      raised: {
        root: "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
      },
    },
    shape: {
      edge: {
        root: "rounded-none",
      },
      floating: {
        root: "rounded-[28px]",
      },
    },
  },
  defaultVariants: {
    density: "comfortable",
    elevation: "flat",
    shape: "edge",
  },
});

type ToolbarSlotProps = Parameters<
  ReturnType<typeof m3ToolbarStyles>["root"]
>[0];

export function m3ToolbarVariants() {
  const styles = m3ToolbarStyles();

  return {
    divider: (props?: ToolbarSlotProps) => styles.divider(props),
    group: (props?: ToolbarSlotProps) => styles.group(props),
    root: (props?: ToolbarSlotProps) => styles.root(props),
    spacer: (props?: ToolbarSlotProps) => styles.spacer(props),
    title: (props?: ToolbarSlotProps) => styles.title(props),
  };
}

export type M3ToolbarProps = React.ComponentPropsWithRef<typeof RACToolbar> &
  VariantProps<typeof m3ToolbarStyles>;

export function M3Toolbar({
  className,
  density = "comfortable",
  elevation = "flat",
  shape = "edge",
  ...props
}: M3ToolbarProps) {
  const { root } = m3ToolbarVariants();

  return (
    <RACToolbar
      className={composeRenderProps(className, (className) =>
        root({ className, density, elevation, shape }),
      )}
      data-density={density}
      data-elevation={elevation}
      data-shape={shape}
      data-slot="toolbar"
      {...props}
    />
  );
}

export type M3ToolbarGroupProps = React.ComponentPropsWithRef<typeof RACGroup>;

export function M3ToolbarGroup({ className, ...props }: M3ToolbarGroupProps) {
  const { group } = m3ToolbarVariants();

  return (
    <RACGroup
      className={composeRenderProps(className, (className) =>
        group({ className }),
      )}
      data-slot="toolbar-group"
      {...props}
    />
  );
}

export type M3ToolbarTitleProps = React.ComponentPropsWithRef<"h2">;

export function M3ToolbarTitle({ className, ...props }: M3ToolbarTitleProps) {
  const { title } = m3ToolbarVariants();

  return (
    <h2 className={title({ className })} data-slot="toolbar-title" {...props} />
  );
}

export type M3ToolbarSpacerProps = React.ComponentPropsWithRef<"div">;

export function M3ToolbarSpacer({ className, ...props }: M3ToolbarSpacerProps) {
  const { spacer } = m3ToolbarVariants();

  return (
    <div
      className={spacer({ className })}
      data-slot="toolbar-spacer"
      {...props}
    />
  );
}

export type M3ToolbarDividerProps = Omit<M3DividerProps, "orientation">;

export function M3ToolbarDivider({
  className,
  ...props
}: M3ToolbarDividerProps) {
  const { divider } = m3ToolbarVariants();

  return (
    <M3Divider
      className={divider({ className })}
      data-slot="toolbar-divider"
      orientation="vertical"
      {...props}
    />
  );
}
