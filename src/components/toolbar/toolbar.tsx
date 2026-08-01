import type * as React from "react";
import {
  Group as RACGroup,
  Toolbar as RACToolbar,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import { Divider, type DividerProps } from "@/components/divider/divider";

export const toolbarStyles = tv({
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

type ToolbarSlotProps = Parameters<ReturnType<typeof toolbarStyles>["root"]>[0];

export function toolbarVariants() {
  const styles = toolbarStyles();

  return {
    divider: (props?: ToolbarSlotProps) => styles.divider(props),
    group: (props?: ToolbarSlotProps) => styles.group(props),
    root: (props?: ToolbarSlotProps) => styles.root(props),
    spacer: (props?: ToolbarSlotProps) => styles.spacer(props),
    title: (props?: ToolbarSlotProps) => styles.title(props),
  };
}

export type ToolbarProps = React.ComponentPropsWithRef<typeof RACToolbar> &
  VariantProps<typeof toolbarStyles>;

export function Toolbar({
  className,
  density = "comfortable",
  elevation = "flat",
  shape = "edge",
  ...props
}: ToolbarProps) {
  const { root } = toolbarVariants();

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

export type ToolbarGroupProps = React.ComponentPropsWithRef<typeof RACGroup>;

export function ToolbarGroup({ className, ...props }: ToolbarGroupProps) {
  const { group } = toolbarVariants();

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

export type ToolbarTitleProps = React.ComponentPropsWithRef<"h2">;

export function ToolbarTitle({ className, ...props }: ToolbarTitleProps) {
  const { title } = toolbarVariants();

  return (
    <h2 className={title({ className })} data-slot="toolbar-title" {...props} />
  );
}

export type ToolbarSpacerProps = React.ComponentPropsWithRef<"div">;

export function ToolbarSpacer({ className, ...props }: ToolbarSpacerProps) {
  const { spacer } = toolbarVariants();

  return (
    <div
      className={spacer({ className })}
      data-slot="toolbar-spacer"
      {...props}
    />
  );
}

export type ToolbarDividerProps = Omit<DividerProps, "orientation">;

export function ToolbarDivider({ className, ...props }: ToolbarDividerProps) {
  const { divider } = toolbarVariants();

  return (
    <Divider
      className={divider({ className })}
      data-slot="toolbar-divider"
      orientation="vertical"
      {...props}
    />
  );
}
