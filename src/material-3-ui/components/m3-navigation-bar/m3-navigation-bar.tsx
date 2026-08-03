import type * as React from "react";
import {
  Link as RACLink,
  composeRenderProps,
  type LinkProps as RACLinkProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import {
  M3Badge,
  M3BadgeAnchor,
} from "@/material-3-ui/components/m3-badge/m3-badge";

export const m3NavigationBarStyles = tv({
  slots: {
    bar: [
      "flex h-20 w-full items-stretch justify-center bg-[#f3edf7] px-2 pt-2 pb-3",
      "text-[#49454f] dark:bg-[#211f26] dark:text-[#cac4d0]",
    ],
    item: [
      "group/navigation-bar-item grid min-w-0 flex-1 content-center justify-items-center gap-1 rounded-[16px] px-1 outline-none select-none",
      "transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "data-disabled:pointer-events-none data-disabled:text-[#1D1B20]/38",
      "data-selected:text-[#1d1b20] dark:data-disabled:text-[#E6E0E9]/38 dark:data-selected:text-[#e6e0e9]",
    ],
    indicator: [
      "relative isolate grid h-8 w-16 place-items-center rounded-full transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-200",
      "group-data-hovered/navigation-bar-item:before:opacity-[0.08] group-data-pressed/navigation-bar-item:before:opacity-[0.1]",
      "group-data-focus-visible/navigation-bar-item:outline-2 group-data-focus-visible/navigation-bar-item:outline-offset-2 group-data-focus-visible/navigation-bar-item:outline-[#6750a4]",
      "group-data-selected/navigation-bar-item:bg-[#e8def8] group-data-selected/navigation-bar-item:text-[#1d192b]",
      "dark:group-data-focus-visible/navigation-bar-item:outline-[#d0bcff] dark:group-data-selected/navigation-bar-item:bg-[#4a4458] dark:group-data-selected/navigation-bar-item:text-[#e8def8]",
    ],
    icon: [
      "relative z-10 text-current",
      "[&_svg:not([class*='size-'])]:size-6 [&_svg]:shrink-0",
    ],
    label:
      "max-w-full overflow-hidden text-center text-xs leading-4 font-medium tracking-[0.5px] text-ellipsis whitespace-nowrap transition-opacity duration-200",
  },
});

type NavigationBarSlotProps = Parameters<
  ReturnType<typeof m3NavigationBarStyles>["bar"]
>[0];

export function m3NavigationBarVariants() {
  const styles = m3NavigationBarStyles();

  return {
    bar: (props?: NavigationBarSlotProps) => styles.bar(props),
    icon: (props?: NavigationBarSlotProps) => styles.icon(props),
    indicator: (props?: NavigationBarSlotProps) => styles.indicator(props),
    item: (props?: NavigationBarSlotProps) => styles.item(props),
    label: (props?: NavigationBarSlotProps) => styles.label(props),
  };
}

export type M3NavigationBarProps = React.ComponentPropsWithRef<"nav">;

export function M3NavigationBar({ className, ...props }: M3NavigationBarProps) {
  const { bar } = m3NavigationBarVariants();

  return (
    <nav
      aria-label="Primary"
      className={bar({ className })}
      data-slot="navigation-bar"
      {...props}
    />
  );
}

export type M3NavigationBarBadge = React.ReactElement | number | string | true;

export type M3NavigationBarItemProps = Omit<
  RACLinkProps,
  "children" | "className"
> & {
  "aria-current"?: React.AriaAttributes["aria-current"];
  badge?: M3NavigationBarBadge | null;
  className?: RACLinkProps["className"];
  icon: React.ReactNode | ((props: { isSelected: boolean }) => React.ReactNode);
  isSelected?: boolean;
  label: React.ReactNode;
  labelVisibility?: "always" | "none" | "selected";
};

export function M3NavigationBarItem({
  "aria-current": ariaCurrent,
  badge,
  className,
  icon: iconContent,
  isSelected = false,
  label: labelContent,
  labelVisibility = "always",
  ...props
}: M3NavigationBarItemProps) {
  const { icon, indicator, item, label } = m3NavigationBarVariants();
  const renderedIcon =
    typeof iconContent === "function"
      ? iconContent({ isSelected })
      : iconContent;
  const labelIsVisible =
    labelVisibility === "always" ||
    (labelVisibility === "selected" && isSelected);

  return (
    <RACLink
      aria-current={isSelected ? "page" : ariaCurrent}
      className={composeRenderProps(className, (className) =>
        item({ className }),
      )}
      data-label-visibility={labelVisibility}
      data-selected={isSelected || undefined}
      data-slot="navigation-bar-item"
      {...props}
    >
      <span className={indicator()} data-slot="navigation-bar-indicator">
        <M3BadgeAnchor className={icon()} data-slot="navigation-bar-icon">
          {renderedIcon}
          {renderBadge(badge)}
        </M3BadgeAnchor>
      </span>
      <span
        className={label({
          className: labelIsVisible ? undefined : "opacity-0",
        })}
        data-slot="navigation-bar-label"
      >
        {labelContent}
      </span>
    </RACLink>
  );
}

function renderBadge(badge: M3NavigationBarItemProps["badge"]) {
  if (badge === undefined || badge === null) {
    return null;
  }

  return badge === true ? <M3Badge /> : <M3Badge>{badge}</M3Badge>;
}
