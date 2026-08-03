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

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import { cn } from "@/lib/utils";

export const m3DialogStyles = tv({
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
  ReturnType<typeof m3DialogStyles>["dialog"]
>[0];

export function m3DialogVariants() {
  const styles = m3DialogStyles();

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

export type M3DialogTriggerProps = RACDialogTriggerProps;

export function M3DialogTrigger(props: M3DialogTriggerProps) {
  return <RACDialogTrigger {...props} />;
}

export type M3DialogProps = Omit<
  React.ComponentPropsWithRef<typeof RACModalOverlay>,
  "children" | "className"
> &
  Pick<React.ComponentPropsWithRef<typeof RACModal>, "isDismissable"> &
  VariantProps<typeof m3DialogStyles> & {
    children: React.ReactNode;
    className?: string;
    role?: "alertdialog" | "dialog";
  };

export function M3Dialog({
  children,
  className,
  isDismissable = true,
  role,
  ...props
}: M3DialogProps) {
  const { dialog, modal, overlay } = m3DialogVariants();

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

export type M3DialogHeaderProps = React.ComponentPropsWithRef<"div">;

export function M3DialogHeader({ className, ...props }: M3DialogHeaderProps) {
  const { header } = m3DialogVariants();

  return (
    <div
      className={header({ className })}
      data-slot="dialog-header"
      {...props}
    />
  );
}

export type M3DialogTitleProps = Omit<
  React.ComponentPropsWithRef<typeof RACHeading>,
  "slot"
>;

export function M3DialogTitle({ className, ...props }: M3DialogTitleProps) {
  const { title } = m3DialogVariants();

  return (
    <RACHeading
      className={title({ className })}
      data-slot="dialog-title"
      slot="title"
      {...props}
    />
  );
}

export type M3DialogContentProps = React.ComponentPropsWithRef<"div">;

export function M3DialogContent({ className, ...props }: M3DialogContentProps) {
  const { content } = m3DialogVariants();

  return (
    <div
      className={content({ className })}
      data-slot="dialog-content"
      {...props}
    />
  );
}

export type M3DialogActionsProps = React.ComponentPropsWithRef<"div">;

export function M3DialogActions({ className, ...props }: M3DialogActionsProps) {
  const { actions } = m3DialogVariants();

  return (
    <div
      className={actions({ className })}
      data-slot="dialog-actions"
      {...props}
    />
  );
}

export type M3DialogCloseProps = React.ComponentPropsWithRef<typeof M3Button>;

export function M3DialogClose({
  children = "Close",
  slot = "close",
  variant = "text",
  ...props
}: M3DialogCloseProps) {
  return (
    <M3Button slot={slot} variant={variant} {...props}>
      {children}
    </M3Button>
  );
}

export type M3FullScreenDialogProps = M3DialogProps;

export function M3FullScreenDialog({
  children,
  className,
  isDismissable = true,
  ...props
}: M3FullScreenDialogProps) {
  const { fullScreenDialog, fullScreenModal, fullScreenOverlay } =
    m3DialogVariants();

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

export type M3FullScreenDialogBarProps = React.ComponentPropsWithRef<"div"> & {
  showCloseButton?: boolean;
};

export function M3FullScreenDialogBar({
  children,
  className,
  showCloseButton = true,
  ...props
}: M3FullScreenDialogBarProps) {
  const { fullScreenBar } = m3DialogVariants();

  return (
    <div
      className={fullScreenBar({ className })}
      data-slot="full-screen-dialog-bar"
      {...props}
    >
      {showCloseButton ? (
        <M3IconButton aria-label="Close dialog" slot="close" variant="standard">
          <XIcon />
        </M3IconButton>
      ) : null}
      {children}
    </div>
  );
}

export type M3FullScreenDialogTitleProps = M3DialogTitleProps;

export function M3FullScreenDialogTitle({
  className,
  ...props
}: M3FullScreenDialogTitleProps) {
  const { fullScreenTitle } = m3DialogVariants();

  return (
    <RACHeading
      className={fullScreenTitle({ className })}
      data-slot="full-screen-dialog-title"
      slot="title"
      {...props}
    />
  );
}

export type M3FullScreenDialogContentProps = M3DialogContentProps;

export function M3FullScreenDialogContent({
  className,
  ...props
}: M3FullScreenDialogContentProps) {
  const { fullScreenContent } = m3DialogVariants();

  return (
    <div
      className={fullScreenContent({ className })}
      data-slot="full-screen-dialog-content"
      {...props}
    />
  );
}

export function M3DialogActionButton({
  className,
  ...props
}: React.ComponentPropsWithRef<typeof M3Button>) {
  return (
    <M3Button
      className={composeRenderProps(className, (className) =>
        cn("min-w-16", className),
      )}
      variant="text"
      {...props}
    />
  );
}
