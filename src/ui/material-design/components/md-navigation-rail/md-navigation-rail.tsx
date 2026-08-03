import type * as React from "react";
import {
  Link as RACLink,
  composeRenderProps,
  type LinkProps as RACLinkProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  MDBadge,
  MDBadgeAnchor,
} from "@/ui/material-design/components/md-badge/md-badge";
import { Sidebar, SidebarProvider } from "@/ui/shadcn/react-aria/sidebar";
import { cn } from "@/lib/utils";

export const mdNavigationRailStyles = tv({
  slots: {
    rail: [
      "flex min-h-[32rem] w-(--sidebar-width) max-w-full flex-col items-center bg-[#fffbfe] px-1 py-3 text-[#49454f]",
      "dark:bg-[#1d1b20] dark:text-[#cac4d0]",
    ],
    header: "flex min-h-14 shrink-0 items-center justify-center pb-2",
    content: "flex w-full flex-1 flex-col items-center gap-1",
    item: [
      "group/navigation-rail-item grid min-h-[4.5rem] w-full content-center justify-items-center gap-1 rounded-[16px] px-1 outline-none select-none",
      "text-[#49454f] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "data-disabled:pointer-events-none data-disabled:text-[#1D1B20]/38",
      "data-selected:text-[#1d1b20] dark:text-[#cac4d0] dark:data-disabled:text-[#E6E0E9]/38 dark:data-selected:text-[#e6e0e9]",
    ],
    indicator: [
      "relative isolate grid h-8 min-w-8 place-items-center rounded-full px-4 transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-200",
      "group-data-hovered/navigation-rail-item:before:opacity-[0.08] group-data-pressed/navigation-rail-item:before:opacity-[0.1]",
      "group-data-focus-visible/navigation-rail-item:outline-2 group-data-focus-visible/navigation-rail-item:outline-offset-2 group-data-focus-visible/navigation-rail-item:outline-[#6750a4]",
      "group-data-selected/navigation-rail-item:bg-[#e8def8] group-data-selected/navigation-rail-item:text-[#1d192b]",
      "dark:group-data-focus-visible/navigation-rail-item:outline-[#d0bcff] dark:group-data-selected/navigation-rail-item:bg-[#4a4458] dark:group-data-selected/navigation-rail-item:text-[#e8def8]",
    ],
    icon: [
      "relative z-10 text-current",
      "[&_svg:not([class*='size-'])]:size-6 [&_svg]:shrink-0",
    ],
    label:
      "max-w-full overflow-hidden text-center text-xs leading-4 font-medium tracking-[0.5px] text-ellipsis whitespace-nowrap transition-opacity duration-200",
  },
  variants: {
    alignment: {
      top: {
        content: "justify-start",
      },
      center: {
        content: "justify-center",
      },
      bottom: {
        content: "justify-end",
      },
    },
  },
  defaultVariants: {
    alignment: "top",
  },
});

type NavigationRailSlotProps = Parameters<
  ReturnType<typeof mdNavigationRailStyles>["rail"]
>[0];

export function mdNavigationRailVariants() {
  const styles = mdNavigationRailStyles();

  return {
    content: (props?: NavigationRailSlotProps) => styles.content(props),
    header: (props?: NavigationRailSlotProps) => styles.header(props),
    icon: (props?: NavigationRailSlotProps) => styles.icon(props),
    indicator: (props?: NavigationRailSlotProps) => styles.indicator(props),
    item: (props?: NavigationRailSlotProps) => styles.item(props),
    label: (props?: NavigationRailSlotProps) => styles.label(props),
    rail: (props?: NavigationRailSlotProps) => styles.rail(props),
  };
}

export type MDNavigationRailProps = Omit<
  React.ComponentPropsWithRef<typeof SidebarProvider>,
  "children" | "className"
> & {
  children: React.ReactNode;
  className?: string;
  providerClassName?: string;
  showDivider?: boolean;
  side?: "left" | "right";
  width?: string;
};

export function MDNavigationRail({
  children,
  className,
  providerClassName,
  showDivider = false,
  side = "left",
  style,
  width = "5rem",
  ...props
}: MDNavigationRailProps) {
  const { rail } = mdNavigationRailVariants();

  return (
    <SidebarProvider
      className={providerClassName ?? "contents"}
      style={
        {
          "--sidebar-width": width,
          ...style,
        } as React.CSSProperties
      }
      {...props}
    >
      <Sidebar
        className={rail({
          className: cn(
            showDivider && side === "left"
              ? "border-r border-[#cac4d0] dark:border-[#49454f]"
              : null,
            showDivider && side === "right"
              ? "border-l border-[#cac4d0] dark:border-[#49454f]"
              : null,
            className,
          ),
        })}
        collapsible="none"
        data-side={side}
        side={side}
      >
        {children}
      </Sidebar>
    </SidebarProvider>
  );
}

export type MDNavigationRailHeaderProps = React.ComponentPropsWithRef<"div">;

export function MDNavigationRailHeader({
  className,
  ...props
}: MDNavigationRailHeaderProps) {
  const { header } = mdNavigationRailVariants();

  return (
    <div
      className={header({ className })}
      data-slot="navigation-rail-header"
      {...props}
    />
  );
}

export type MDNavigationRailContentProps = React.ComponentPropsWithRef<"div"> &
  Pick<VariantProps<typeof mdNavigationRailStyles>, "alignment">;

export function MDNavigationRailContent({
  alignment = "top",
  className,
  ...props
}: MDNavigationRailContentProps) {
  const { content } = mdNavigationRailVariants();

  return (
    <div
      className={content({ alignment, className })}
      data-slot="navigation-rail-content"
      {...props}
    />
  );
}

export type MDNavigationRailBadge = React.ReactElement | number | string | true;

export type MDNavigationRailItemProps = Omit<
  RACLinkProps,
  "children" | "className"
> & {
  "aria-current"?: React.AriaAttributes["aria-current"];
  badge?: MDNavigationRailBadge | null;
  className?: RACLinkProps["className"];
  icon: React.ReactNode | ((props: { isSelected: boolean }) => React.ReactNode);
  isSelected?: boolean;
  label: React.ReactNode;
  labelVisibility?: "always" | "none" | "selected";
};

export function MDNavigationRailItem({
  "aria-current": ariaCurrent,
  badge,
  className,
  icon: iconContent,
  isSelected = false,
  label: labelContent,
  labelVisibility = "selected",
  ...props
}: MDNavigationRailItemProps) {
  const { icon, indicator, item, label } = mdNavigationRailVariants();
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
      data-slot="navigation-rail-item"
      {...props}
    >
      <span className={indicator()} data-slot="navigation-rail-indicator">
        <MDBadgeAnchor className={icon()} data-slot="navigation-rail-icon">
          {renderedIcon}
          {renderBadge(badge)}
        </MDBadgeAnchor>
      </span>
      <span
        className={label({
          className: labelIsVisible ? undefined : "opacity-0",
        })}
        data-slot="navigation-rail-label"
      >
        {labelContent}
      </span>
    </RACLink>
  );
}

function renderBadge(badge: MDNavigationRailItemProps["badge"]) {
  if (badge === undefined || badge === null) {
    return null;
  }

  return badge === true ? <MDBadge /> : <MDBadge>{badge}</MDBadge>;
}
