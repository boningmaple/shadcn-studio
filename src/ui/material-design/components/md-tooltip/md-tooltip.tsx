"use client";

import * as React from "react";
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  Focusable,
  Heading as RACHeading,
  Popover as RACPopover,
  Tooltip as RACTooltip,
  TooltipTrigger as RACTooltipTrigger,
  type DialogTriggerProps as RACDialogTriggerProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

export const mdTooltipStyles = tv({
  slots: {
    plain: [
      "z-50 max-w-50 rounded-[4px] bg-[#322f35] px-2 py-1",
      "text-xs leading-4 font-normal text-[#f5eff7] shadow-none outline-none",
      "origin-(--trigger-anchor-point) data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95",
      "data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95",
      "motion-reduce:animate-none",
    ],
    richPopover: [
      "z-50 w-80 max-w-[calc(100vw-2rem)] rounded-[12px] p-4",
      "bg-[#f7f2fa] text-[#1d1b20]",
      "shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)] outline-none",
      "origin-(--trigger-anchor-point) data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95",
      "data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95",
      "dark:bg-[#211f26] dark:text-[#e6e0e9]",
      "motion-reduce:animate-none",
    ],
    richDialog: "grid gap-2 outline-none",
    richTitle: "font-heading text-sm leading-5 font-medium tracking-normal",
    richContent: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    richActions: "mt-2 flex flex-wrap items-center justify-end gap-2",
  },
});

type TooltipSlotProps = Parameters<
  ReturnType<typeof mdTooltipStyles>["plain"]
>[0];

export function mdTooltipVariants() {
  const styles = mdTooltipStyles();

  return {
    plain: (props?: TooltipSlotProps) => styles.plain(props),
    richActions: (props?: TooltipSlotProps) => styles.richActions(props),
    richContent: (props?: TooltipSlotProps) => styles.richContent(props),
    richDialog: (props?: TooltipSlotProps) => styles.richDialog(props),
    richPopover: (props?: TooltipSlotProps) => styles.richPopover(props),
    richTitle: (props?: TooltipSlotProps) => styles.richTitle(props),
  };
}

export type MDTooltipTriggerProps = React.ComponentPropsWithRef<
  typeof RACTooltipTrigger
>;

export function MDTooltipTrigger({
  delay = 500,
  closeDelay = 100,
  children,
  ...props
}: MDTooltipTriggerProps) {
  const [trigger, tooltip] = React.Children.toArray(children);

  return (
    <RACTooltipTrigger
      closeDelay={closeDelay}
      data-slot="tooltip-trigger"
      delay={delay}
      {...props}
    >
      <Focusable>
        {trigger as React.ComponentProps<typeof Focusable>["children"]}
      </Focusable>
      {tooltip}
    </RACTooltipTrigger>
  );
}

export type MDTooltipProps = Omit<
  React.ComponentPropsWithRef<typeof RACTooltip>,
  "children" | "className"
> & {
  children?: React.ReactNode;
  className?: string;
};

export function MDTooltip({
  className,
  offset = 8,
  placement = "top",
  ...props
}: MDTooltipProps) {
  const { plain } = mdTooltipVariants();

  return (
    <RACTooltip
      className={plain({ className })}
      data-slot="tooltip"
      offset={offset}
      placement={placement}
      {...props}
    />
  );
}

export type MDRichTooltipTriggerProps = RACDialogTriggerProps;

export function MDRichTooltipTrigger(props: MDRichTooltipTriggerProps) {
  return <RACDialogTrigger data-slot="rich-tooltip-trigger" {...props} />;
}

export type MDRichTooltipProps = Omit<
  React.ComponentPropsWithRef<typeof RACPopover>,
  "children" | "className"
> & {
  actions?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
};

export function MDRichTooltip({
  actions,
  children,
  className,
  offset = 8,
  placement = "top",
  title,
  ...props
}: MDRichTooltipProps) {
  const { richActions, richContent, richDialog, richPopover, richTitle } =
    mdTooltipVariants();

  return (
    <RACPopover
      className={richPopover({ className })}
      data-slot="rich-tooltip"
      offset={offset}
      placement={placement}
      {...props}
    >
      <RACDialog className={richDialog()} data-slot="rich-tooltip-dialog">
        {title === undefined ? null : (
          <RACHeading className={richTitle()} slot="title">
            {title}
          </RACHeading>
        )}
        <div className={richContent()} data-slot="rich-tooltip-content">
          {children}
        </div>
        {actions === undefined ? null : (
          <div className={richActions()} data-slot="rich-tooltip-actions">
            {actions}
          </div>
        )}
      </RACDialog>
    </RACPopover>
  );
}
