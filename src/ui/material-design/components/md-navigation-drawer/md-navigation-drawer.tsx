import type * as React from "react";
import {
  Link as RACLink,
  composeRenderProps,
  type LinkProps as RACLinkProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { MDDivider } from "@/ui/material-design/components/md-divider/md-divider";
import {
  MDModalSideSheet,
  MDSideSheetTrigger,
  MDStandardSideSheet,
  type MDModalSideSheetProps,
  type MDStandardSideSheetProps,
} from "@/ui/material-design/components/md-side-sheet/md-side-sheet";

export const mdNavigationDrawerStyles = tv({
  slots: {
    standard:
      "min-h-[32rem] border-[#cac4d0] bg-[#f7f2fa] py-3 dark:border-[#49454f] dark:bg-[#211f26]",
    modal:
      "!w-[min(100vw,22.5rem)] gap-0 rounded-none bg-[#f7f2fa] py-3 data-[side=left]:rounded-r-[16px] data-[side=right]:rounded-l-[16px] dark:bg-[#211f26]",
    header: "grid shrink-0 gap-1 px-6 pt-5 pb-4",
    headline:
      "font-heading text-xl leading-7 font-normal tracking-normal text-[#1d1b20] dark:text-[#e6e0e9]",
    supportingText: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    section: "grid gap-1 px-3 py-2",
    sectionHeader:
      "px-4 pt-3 pb-2 text-sm leading-5 font-medium text-[#49454f] dark:text-[#cac4d0]",
    item: [
      "group/navigation-drawer-item relative grid min-h-14 grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 overflow-hidden rounded-full px-4 text-left outline-none select-none",
      "text-sm leading-5 font-medium text-[#49454f] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200",
      "data-hovered:before:opacity-[0.08] data-focus-visible:before:opacity-[0.1] data-pressed:before:opacity-[0.1]",
      "data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-[#6750a4]",
      "data-selected:bg-[#e8def8] data-selected:text-[#1d1b20]",
      "data-disabled:pointer-events-none data-disabled:text-[#1D1B20]/38 data-disabled:before:opacity-0",
      "dark:text-[#cac4d0] dark:data-focus-visible:outline-[#d0bcff] dark:data-selected:bg-[#4a4458] dark:data-selected:text-[#e8def8] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    icon: "relative z-10 text-current [&_svg:not([class*='size-'])]:size-6 [&_svg]:shrink-0",
    label: "relative z-10 truncate",
    badge:
      "relative z-10 min-w-5 justify-self-end text-xs leading-4 font-medium text-[#49454f] dark:text-[#cac4d0]",
    divider: "my-2",
  },
});

type NavigationDrawerSlotProps = Parameters<
  ReturnType<typeof mdNavigationDrawerStyles>["standard"]
>[0];

export function mdNavigationDrawerVariants() {
  const styles = mdNavigationDrawerStyles();

  return {
    badge: (props?: NavigationDrawerSlotProps) => styles.badge(props),
    divider: (props?: NavigationDrawerSlotProps) => styles.divider(props),
    header: (props?: NavigationDrawerSlotProps) => styles.header(props),
    headline: (props?: NavigationDrawerSlotProps) => styles.headline(props),
    icon: (props?: NavigationDrawerSlotProps) => styles.icon(props),
    item: (props?: NavigationDrawerSlotProps) => styles.item(props),
    label: (props?: NavigationDrawerSlotProps) => styles.label(props),
    modal: (props?: NavigationDrawerSlotProps) => styles.modal(props),
    section: (props?: NavigationDrawerSlotProps) => styles.section(props),
    sectionHeader: (props?: NavigationDrawerSlotProps) =>
      styles.sectionHeader(props),
    standard: (props?: NavigationDrawerSlotProps) => styles.standard(props),
    supportingText: (props?: NavigationDrawerSlotProps) =>
      styles.supportingText(props),
  };
}

export type MDNavigationDrawerTriggerProps = React.ComponentPropsWithRef<
  typeof MDSideSheetTrigger
>;

export function MDNavigationDrawerTrigger(
  props: MDNavigationDrawerTriggerProps,
) {
  return <MDSideSheetTrigger {...props} />;
}

export type MDStandardNavigationDrawerProps = Omit<
  MDStandardSideSheetProps,
  "className" | "width"
> & {
  className?: string;
  width?: string;
};

export function MDStandardNavigationDrawer({
  className,
  side = "left",
  width = "22.5rem",
  ...props
}: MDStandardNavigationDrawerProps) {
  const { standard } = mdNavigationDrawerVariants();

  return (
    <MDStandardSideSheet
      className={standard({ className })}
      side={side}
      width={width}
      {...props}
    />
  );
}

export type MDModalNavigationDrawerProps = Omit<
  MDModalSideSheetProps,
  "className"
> & {
  className?: string;
};

export function MDModalNavigationDrawer({
  className,
  side = "left",
  ...props
}: MDModalNavigationDrawerProps) {
  const { modal } = mdNavigationDrawerVariants();

  return (
    <MDModalSideSheet className={modal({ className })} side={side} {...props} />
  );
}

export type MDNavigationDrawerHeaderProps =
  React.ComponentPropsWithRef<"div"> & {
    headline?: React.ReactNode;
    supportingText?: React.ReactNode;
  };

export function MDNavigationDrawerHeader({
  children,
  className,
  headline,
  supportingText,
  ...props
}: MDNavigationDrawerHeaderProps) {
  const {
    header,
    headline: headlineSlot,
    supportingText: supportingTextSlot,
  } = mdNavigationDrawerVariants();

  return (
    <div
      className={header({ className })}
      data-slot="navigation-drawer-header"
      {...props}
    >
      {headline === undefined ? null : (
        <span className={headlineSlot()} data-slot="navigation-drawer-headline">
          {headline}
        </span>
      )}
      {supportingText === undefined ? null : (
        <span
          className={supportingTextSlot()}
          data-slot="navigation-drawer-supporting-text"
        >
          {supportingText}
        </span>
      )}
      {children}
    </div>
  );
}

export type MDNavigationDrawerSectionProps =
  React.ComponentPropsWithRef<"div"> & {
    title?: React.ReactNode;
  };

export function MDNavigationDrawerSection({
  children,
  className,
  title,
  ...props
}: MDNavigationDrawerSectionProps) {
  const { section, sectionHeader } = mdNavigationDrawerVariants();

  return (
    <div
      className={section({ className })}
      data-slot="navigation-drawer-section"
      role="list"
      {...props}
    >
      {title === undefined ? null : (
        <span
          className={sectionHeader()}
          data-slot="navigation-drawer-section-header"
        >
          {title}
        </span>
      )}
      {children}
    </div>
  );
}

export type MDNavigationDrawerItemProps = Omit<
  RACLinkProps,
  "children" | "className"
> & {
  "aria-current"?: React.AriaAttributes["aria-current"];
  badge?: React.ReactNode;
  className?: RACLinkProps["className"];
  icon?: React.ReactNode;
  isSelected?: boolean;
  label: React.ReactNode;
};

export function MDNavigationDrawerItem({
  "aria-current": ariaCurrent,
  badge: badgeContent,
  className,
  icon: iconContent,
  isSelected = false,
  label: labelContent,
  ...props
}: MDNavigationDrawerItemProps) {
  const { badge, icon, item, label } = mdNavigationDrawerVariants();

  return (
    <RACLink
      aria-current={isSelected ? "page" : ariaCurrent}
      className={composeRenderProps(className, (className) =>
        item({ className }),
      )}
      data-selected={isSelected || undefined}
      data-slot="navigation-drawer-item"
      {...props}
    >
      <span className={icon()} data-slot="navigation-drawer-item-icon">
        {iconContent}
      </span>
      <span className={label()} data-slot="navigation-drawer-item-label">
        {labelContent}
      </span>
      {badgeContent === undefined || badgeContent === null ? null : (
        <span className={badge()} data-slot="navigation-drawer-item-badge">
          {badgeContent}
        </span>
      )}
    </RACLink>
  );
}

export type MDNavigationDrawerDividerProps = React.ComponentPropsWithRef<
  typeof MDDivider
>;

export function MDNavigationDrawerDivider({
  className,
  inset = "both",
  ...props
}: MDNavigationDrawerDividerProps) {
  const { divider } = mdNavigationDrawerVariants();

  return (
    <MDDivider className={divider({ className })} inset={inset} {...props} />
  );
}
