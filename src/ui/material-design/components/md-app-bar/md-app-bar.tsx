import type * as React from "react";
import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  MDSearchBar,
  type MDSearchBarProps,
} from "@/ui/material-design/components/md-search/md-search";
import {
  MDToolbar,
  type MDToolbarProps,
} from "@/ui/material-design/components/md-toolbar/md-toolbar";

export const mdAppBarStyles = tv({
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

type AppBarSlotProps = Parameters<ReturnType<typeof mdAppBarStyles>["root"]>[0];

export function mdAppBarVariants() {
  const styles = mdAppBarStyles();

  return {
    actions: (props?: AppBarSlotProps) => styles.actions(props),
    root: (props?: AppBarSlotProps) => styles.root(props),
    search: (props?: AppBarSlotProps) => styles.search(props),
    title: (props?: AppBarSlotProps) => styles.title(props),
  };
}

export type MDAppBarProps = Omit<MDToolbarProps, "elevation" | "shape"> &
  VariantProps<typeof mdAppBarStyles>;

export function MDAppBar({
  className,
  elevation = "flat",
  size = "small",
  ...props
}: MDAppBarProps) {
  const { root } = mdAppBarVariants();

  return (
    <MDToolbar
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

export type MDAppBarTitleProps = React.ComponentPropsWithRef<"h1">;

export function MDAppBarTitle({ className, ...props }: MDAppBarTitleProps) {
  const { title } = mdAppBarVariants();

  return (
    <h1 className={title({ className })} data-slot="app-bar-title" {...props} />
  );
}

export type MDAppBarActionsProps = React.ComponentPropsWithRef<"div">;

export function MDAppBarActions({ className, ...props }: MDAppBarActionsProps) {
  const { actions } = mdAppBarVariants();

  return (
    <div
      className={actions({ className })}
      data-slot="app-bar-actions"
      {...props}
    />
  );
}

export type MDSearchAppBarProps = Omit<MDAppBarProps, "children"> & {
  children?: React.ReactNode;
  searchProps?: MDSearchBarProps;
};

export function MDSearchAppBar({
  children,
  searchProps,
  ...props
}: MDSearchAppBarProps) {
  const { search } = mdAppBarVariants();
  const { className: searchClassName, ...resolvedSearchProps } =
    searchProps ?? {};

  return (
    <MDAppBar {...props}>
      <MDSearchBar
        className={composeRenderProps(searchClassName, (className) =>
          search({ className }),
        )}
        {...resolvedSearchProps}
      />
      {children}
    </MDAppBar>
  );
}
