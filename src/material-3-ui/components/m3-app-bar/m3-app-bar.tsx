import type * as React from "react";
import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  M3SearchBar,
  type M3SearchBarProps,
} from "@/material-3-ui/components/m3-search/m3-search";
import {
  M3Toolbar,
  type M3ToolbarProps,
} from "@/material-3-ui/components/m3-toolbar/m3-toolbar";

export const m3AppBarStyles = tv({
  slots: {
    root: [
      "group/app-bar w-full bg-[#fffbfe] text-[#1d1b20]",
      "dark:bg-[#1d1b20] dark:text-[#e6e0e9]",
    ],
    title: [
      "font-heading min-w-0 flex-1 truncate text-xl leading-7 font-normal tracking-normal",
      "group-data-[size=medium]/app-bar:text-3xl group-data-[size=medium]/app-bar:leading-9",
      "group-data-[size=large]/app-bar:text-[2rem] group-data-[size=large]/app-bar:leading-10",
    ],
    actions: "flex shrink-0 items-center gap-1",
    search: "min-w-0 flex-1",
  },
  variants: {
    elevation: {
      flat: {
        root: "shadow-none",
      },
      raised: {
        root: "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
      },
    },
    size: {
      small: {
        root: "min-h-16",
      },
      medium: {
        root: "min-h-28 items-end pb-6",
      },
      large: {
        root: "min-h-38 items-end pb-7",
      },
    },
  },
  defaultVariants: {
    elevation: "flat",
    size: "small",
  },
});

type AppBarSlotProps = Parameters<ReturnType<typeof m3AppBarStyles>["root"]>[0];

export function m3AppBarVariants() {
  const styles = m3AppBarStyles();

  return {
    actions: (props?: AppBarSlotProps) => styles.actions(props),
    root: (props?: AppBarSlotProps) => styles.root(props),
    search: (props?: AppBarSlotProps) => styles.search(props),
    title: (props?: AppBarSlotProps) => styles.title(props),
  };
}

export type M3AppBarProps = Omit<M3ToolbarProps, "elevation" | "shape"> &
  VariantProps<typeof m3AppBarStyles>;

export function M3AppBar({
  className,
  elevation = "flat",
  size = "small",
  ...props
}: M3AppBarProps) {
  const { root } = m3AppBarVariants();

  return (
    <M3Toolbar
      className={composeRenderProps(className, (className) =>
        root({ className, elevation, size }),
      )}
      data-size={size}
      data-slot="app-bar"
      elevation="flat"
      shape="edge"
      {...props}
    />
  );
}

export type M3AppBarTitleProps = React.ComponentPropsWithRef<"h1">;

export function M3AppBarTitle({ className, ...props }: M3AppBarTitleProps) {
  const { title } = m3AppBarVariants();

  return (
    <h1 className={title({ className })} data-slot="app-bar-title" {...props} />
  );
}

export type M3AppBarActionsProps = React.ComponentPropsWithRef<"div">;

export function M3AppBarActions({ className, ...props }: M3AppBarActionsProps) {
  const { actions } = m3AppBarVariants();

  return (
    <div
      className={actions({ className })}
      data-slot="app-bar-actions"
      {...props}
    />
  );
}

export type M3SearchAppBarProps = Omit<M3AppBarProps, "children"> & {
  children?: React.ReactNode;
  searchProps?: M3SearchBarProps;
};

export function M3SearchAppBar({
  children,
  searchProps,
  ...props
}: M3SearchAppBarProps) {
  const { search } = m3AppBarVariants();
  const { className: searchClassName, ...resolvedSearchProps } =
    searchProps ?? {};

  return (
    <M3AppBar {...props}>
      <M3SearchBar
        className={composeRenderProps(searchClassName, (className) =>
          search({ className }),
        )}
        {...resolvedSearchProps}
      />
      {children}
    </M3AppBar>
  );
}
