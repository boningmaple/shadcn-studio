import type * as React from "react";
import { XIcon } from "lucide-react";
import {
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  Heading as RACHeading,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  composeRenderProps,
  type DialogTriggerProps as RACDialogTriggerProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import { cn } from "@/lib/utils";

export const mdDialogStyles = tv({
  slots: {
    overlay: [
      "fixed inset-0 z-50 grid place-items-center bg-[#000]/32 p-6",
      "data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0",
    ],
    modal: [
      "max-h-[min(35rem,calc(100vh-3rem))] w-full max-w-[35rem] overflow-hidden rounded-[28px]",
      "bg-[#f7f2fa] text-[#1d1b20] shadow-[0_8px_12px_6px_rgb(0_0_0/0.15),0_4px_4px_0_rgb(0_0_0/0.3)] outline-none",
      "data-entering:animate-in data-entering:zoom-in-95 data-exiting:animate-out data-exiting:zoom-out-95",
      "dark:bg-[#211f26] dark:text-[#e6e0e9]",
    ],
    dialog: "grid max-h-[inherit] outline-none",
    header: "grid gap-4 px-6 pt-6",
    title: "font-heading text-2xl leading-8 font-normal tracking-normal",
    content:
      "overflow-y-auto px-6 py-4 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    actions: "flex flex-wrap items-center justify-end gap-2 px-6 pt-2 pb-6",
    fullScreenOverlay: "fixed inset-0 z-50 bg-[#fffbfe] dark:bg-[#1d1b20]",
    fullScreenModal:
      "h-full w-full bg-[#fffbfe] text-[#1d1b20] outline-none dark:bg-[#1d1b20] dark:text-[#e6e0e9]",
    fullScreenDialog: "grid h-full grid-rows-[auto_1fr] outline-none",
    fullScreenBar:
      "flex h-16 items-center gap-3 border-b border-[#cac4d0] px-2 dark:border-[#49454f]",
    fullScreenTitle:
      "font-heading flex-1 text-xl leading-7 font-normal tracking-normal",
    fullScreenContent:
      "overflow-y-auto px-6 py-6 text-sm leading-6 text-[#49454f] dark:text-[#cac4d0]",
  },
});

type DialogSlotProps = Parameters<
  ReturnType<typeof mdDialogStyles>["dialog"]
>[0];

export function mdDialogVariants() {
  const styles = mdDialogStyles();

  return {
    actions: (props?: DialogSlotProps) => styles.actions(props),
    content: (props?: DialogSlotProps) => styles.content(props),
    dialog: (props?: DialogSlotProps) => styles.dialog(props),
    fullScreenBar: (props?: DialogSlotProps) => styles.fullScreenBar(props),
    fullScreenContent: (props?: DialogSlotProps) =>
      styles.fullScreenContent(props),
    fullScreenDialog: (props?: DialogSlotProps) =>
      styles.fullScreenDialog(props),
    fullScreenModal: (props?: DialogSlotProps) => styles.fullScreenModal(props),
    fullScreenOverlay: (props?: DialogSlotProps) =>
      styles.fullScreenOverlay(props),
    fullScreenTitle: (props?: DialogSlotProps) => styles.fullScreenTitle(props),
    header: (props?: DialogSlotProps) => styles.header(props),
    modal: (props?: DialogSlotProps) => styles.modal(props),
    overlay: (props?: DialogSlotProps) => styles.overlay(props),
    title: (props?: DialogSlotProps) => styles.title(props),
  };
}

export type MDDialogTriggerProps = RACDialogTriggerProps;

export function MDDialogTrigger(props: MDDialogTriggerProps) {
  return <RACDialogTrigger {...props} />;
}

export type MDDialogProps = Omit<
  React.ComponentPropsWithRef<typeof RACModalOverlay>,
  "children" | "className"
> &
  Pick<React.ComponentPropsWithRef<typeof RACModal>, "isDismissable"> &
  VariantProps<typeof mdDialogStyles> & {
    children: React.ReactNode;
    className?: string;
    role?: "alertdialog" | "dialog";
  };

export function MDDialog({
  children,
  className,
  isDismissable = true,
  role,
  ...props
}: MDDialogProps) {
  const { dialog, modal, overlay } = mdDialogVariants();

  return (
    <RACModalOverlay
      className={overlay()}
      data-slot="dialog-overlay"
      isDismissable={isDismissable}
      {...props}
    >
      <RACModal className={modal({ className })} data-slot="dialog-modal">
        <RACDialog className={dialog()} data-slot="dialog" role={role}>
          {children}
        </RACDialog>
      </RACModal>
    </RACModalOverlay>
  );
}

export type MDDialogHeaderProps = React.ComponentPropsWithRef<"div">;

export function MDDialogHeader({ className, ...props }: MDDialogHeaderProps) {
  const { header } = mdDialogVariants();

  return (
    <div
      className={header({ className })}
      data-slot="dialog-header"
      {...props}
    />
  );
}

export type MDDialogTitleProps = Omit<
  React.ComponentPropsWithRef<typeof RACHeading>,
  "slot"
>;

export function MDDialogTitle({ className, ...props }: MDDialogTitleProps) {
  const { title } = mdDialogVariants();

  return (
    <RACHeading
      className={title({ className })}
      data-slot="dialog-title"
      slot="title"
      {...props}
    />
  );
}

export type MDDialogContentProps = React.ComponentPropsWithRef<"div">;

export function MDDialogContent({ className, ...props }: MDDialogContentProps) {
  const { content } = mdDialogVariants();

  return (
    <div
      className={content({ className })}
      data-slot="dialog-content"
      {...props}
    />
  );
}

export type MDDialogActionsProps = React.ComponentPropsWithRef<"div">;

export function MDDialogActions({ className, ...props }: MDDialogActionsProps) {
  const { actions } = mdDialogVariants();

  return (
    <div
      className={actions({ className })}
      data-slot="dialog-actions"
      {...props}
    />
  );
}

export type MDDialogCloseProps = React.ComponentPropsWithRef<typeof MDButton>;

export function MDDialogClose({
  children = "Close",
  slot = "close",
  variant = "text",
  ...props
}: MDDialogCloseProps) {
  return (
    <MDButton slot={slot} variant={variant} {...props}>
      {children}
    </MDButton>
  );
}

export type MDFullScreenDialogProps = MDDialogProps;

export function MDFullScreenDialog({
  children,
  className,
  isDismissable = true,
  ...props
}: MDFullScreenDialogProps) {
  const { fullScreenDialog, fullScreenModal, fullScreenOverlay } =
    mdDialogVariants();

  return (
    <RACModalOverlay
      className={fullScreenOverlay()}
      data-slot="full-screen-dialog-overlay"
      isDismissable={isDismissable}
      {...props}
    >
      <RACModal
        className={fullScreenModal({ className })}
        data-slot="full-screen-dialog-modal"
      >
        <RACDialog
          className={fullScreenDialog()}
          data-slot="full-screen-dialog"
        >
          {children}
        </RACDialog>
      </RACModal>
    </RACModalOverlay>
  );
}

export type MDFullScreenDialogBarProps = React.ComponentPropsWithRef<"div"> & {
  showCloseButton?: boolean;
};

export function MDFullScreenDialogBar({
  children,
  className,
  showCloseButton = true,
  ...props
}: MDFullScreenDialogBarProps) {
  const { fullScreenBar } = mdDialogVariants();

  return (
    <div
      className={fullScreenBar({ className })}
      data-slot="full-screen-dialog-bar"
      {...props}
    >
      {showCloseButton ? (
        <MDIconButton aria-label="Close dialog" slot="close" variant="standard">
          <XIcon />
        </MDIconButton>
      ) : null}
      {children}
    </div>
  );
}

export type MDFullScreenDialogTitleProps = MDDialogTitleProps;

export function MDFullScreenDialogTitle({
  className,
  ...props
}: MDFullScreenDialogTitleProps) {
  const { fullScreenTitle } = mdDialogVariants();

  return (
    <RACHeading
      className={fullScreenTitle({ className })}
      data-slot="full-screen-dialog-title"
      slot="title"
      {...props}
    />
  );
}

export type MDFullScreenDialogContentProps = MDDialogContentProps;

export function MDFullScreenDialogContent({
  className,
  ...props
}: MDFullScreenDialogContentProps) {
  const { fullScreenContent } = mdDialogVariants();

  return (
    <div
      className={fullScreenContent({ className })}
      data-slot="full-screen-dialog-content"
      {...props}
    />
  );
}

export function MDDialogActionButton({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof MDButton>) {
  return (
    <MDButton
      className={composeRenderProps(className, (className) =>
        cn("min-w-16", className),
      )}
      variant="text"
      {...props}
    />
  );
}
