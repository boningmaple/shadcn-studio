import type * as React from "react";
import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import { SearchBar, type SearchBarProps } from "@/components/search/search";
import { Toolbar, type ToolbarProps } from "@/components/toolbar/toolbar";

export const appBarStyles = tv({
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

type AppBarSlotProps = Parameters<ReturnType<typeof appBarStyles>["root"]>[0];

export function appBarVariants() {
  const styles = appBarStyles();

  return {
    actions: (props?: AppBarSlotProps) => styles.actions(props),
    root: (props?: AppBarSlotProps) => styles.root(props),
    search: (props?: AppBarSlotProps) => styles.search(props),
    title: (props?: AppBarSlotProps) => styles.title(props),
  };
}

export type AppBarProps = Omit<ToolbarProps, "elevation" | "shape"> &
  VariantProps<typeof appBarStyles>;

export function AppBar({
  className,
  elevation = "flat",
  size = "small",
  ...props
}: AppBarProps) {
  const { root } = appBarVariants();

  return (
    <Toolbar
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

export type AppBarTitleProps = React.ComponentPropsWithRef<"h1">;

export function AppBarTitle({ className, ...props }: AppBarTitleProps) {
  const { title } = appBarVariants();

  return (
    <h1 className={title({ className })} data-slot="app-bar-title" {...props} />
  );
}

export type AppBarActionsProps = React.ComponentPropsWithRef<"div">;

export function AppBarActions({ className, ...props }: AppBarActionsProps) {
  const { actions } = appBarVariants();

  return (
    <div
      className={actions({ className })}
      data-slot="app-bar-actions"
      {...props}
    />
  );
}

export type SearchAppBarProps = Omit<AppBarProps, "children"> & {
  children?: React.ReactNode;
  searchProps?: SearchBarProps;
};

export function SearchAppBar({
  children,
  searchProps,
  ...props
}: SearchAppBarProps) {
  const { search } = appBarVariants();
  const { className: searchClassName, ...resolvedSearchProps } =
    searchProps ?? {};

  return (
    <AppBar {...props}>
      <SearchBar
        className={composeRenderProps(searchClassName, (className) =>
          search({ className }),
        )}
        {...resolvedSearchProps}
      />
      {children}
    </AppBar>
  );
}
