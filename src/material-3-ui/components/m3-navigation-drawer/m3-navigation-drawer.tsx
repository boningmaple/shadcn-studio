import type * as React from "react";
import {
  Link as RACLink,
  composeRenderProps,
  type LinkProps as RACLinkProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { M3Divider } from "@/material-3-ui/components/m3-divider/m3-divider";
import {
  M3ModalSideSheet,
  M3SideSheetTrigger,
  M3StandardSideSheet,
  type M3ModalSideSheetProps,
  type M3StandardSideSheetProps,
} from "@/material-3-ui/components/m3-side-sheet/m3-side-sheet";

export const m3NavigationDrawerStyles = tv({
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
  ReturnType<typeof m3NavigationDrawerStyles>["standard"]
>[0];

export function m3NavigationDrawerVariants() {
  const styles = m3NavigationDrawerStyles();

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

export type M3NavigationDrawerTriggerProps = React.ComponentPropsWithRef<
  typeof M3SideSheetTrigger
>;

export function M3NavigationDrawerTrigger(
  props: M3NavigationDrawerTriggerProps,
) {
  return <M3SideSheetTrigger {...props} />;
}

export type M3StandardNavigationDrawerProps = Omit<
  M3StandardSideSheetProps,
  "className" | "width"
> & {
  className?: string;
  width?: string;
};

export function M3StandardNavigationDrawer({
  className,
  side = "left",
  width = "22.5rem",
  ...props
}: M3StandardNavigationDrawerProps) {
  const { standard } = m3NavigationDrawerVariants();

  return (
    <M3StandardSideSheet
      className={standard({ className })}
      side={side}
      width={width}
      {...props}
    />
  );
}

export type M3ModalNavigationDrawerProps = Omit<
  M3ModalSideSheetProps,
  "className"
> & {
  className?: string;
};

export function M3ModalNavigationDrawer({
  className,
  side = "left",
  ...props
}: M3ModalNavigationDrawerProps) {
  const { modal } = m3NavigationDrawerVariants();

  return (
    <M3ModalSideSheet className={modal({ className })} side={side} {...props} />
  );
}

export type M3NavigationDrawerHeaderProps =
  React.ComponentPropsWithRef<"div"> & {
    headline?: React.ReactNode;
    supportingText?: React.ReactNode;
  };

export function M3NavigationDrawerHeader({
  children,
  className,
  headline,
  supportingText,
  ...props
}: M3NavigationDrawerHeaderProps) {
  const {
    header,
    headline: headlineSlot,
    supportingText: supportingTextSlot,
  } = m3NavigationDrawerVariants();

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

export type M3NavigationDrawerSectionProps =
  React.ComponentPropsWithRef<"div"> & {
    title?: React.ReactNode;
  };

export function M3NavigationDrawerSection({
  children,
  className,
  title,
  ...props
}: M3NavigationDrawerSectionProps) {
  const { section, sectionHeader } = m3NavigationDrawerVariants();

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

export type M3NavigationDrawerItemProps = Omit<
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

export function M3NavigationDrawerItem({
  "aria-current": ariaCurrent,
  badge: badgeContent,
  className,
  icon: iconContent,
  isSelected = false,
  label: labelContent,
  ...props
}: M3NavigationDrawerItemProps) {
  const { badge, icon, item, label } = m3NavigationDrawerVariants();

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

export type M3NavigationDrawerDividerProps = React.ComponentPropsWithRef<
  typeof M3Divider
>;

export function M3NavigationDrawerDivider({
  className,
  inset = "both",
  ...props
}: M3NavigationDrawerDividerProps) {
  const { divider } = m3NavigationDrawerVariants();

  return (
    <M3Divider className={divider({ className })} inset={inset} {...props} />
  );
}
