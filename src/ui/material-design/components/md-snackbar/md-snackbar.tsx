import * as React from "react";
import { XIcon } from "lucide-react";
import {
  UNSTABLE_Toast as RACToast,
  UNSTABLE_ToastContent as RACToastContent,
  UNSTABLE_ToastRegion as RACToastRegion,
  UNSTABLE_ToastStateContext,
  composeRenderProps,
  type QueuedToast,
  type ToastProps as RACToastProps,
  type ToastRegionProps as RACToastRegionProps,
} from "react-aria-components";
import { tv } from "tailwind-variants";

import { MDButton } from "@/ui/material-design/components/md-button/md-button";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";

export type MDSnackbarContent = {
  actionLabel?: React.ReactNode;
  closeLabel?: string;
  message: React.ReactNode;
  onAction?: () => void;
  showCloseButton?: boolean;
};

export const mdSnackbarStyles = tv({
  slots: {
    region:
      "pointer-events-none fixed inset-x-0 bottom-0 z-50 flex justify-center px-4 pb-6 sm:justify-start sm:px-6",
    list: "grid w-full max-w-xl gap-2",
    root: [
      "pointer-events-auto grid min-h-12 grid-cols-[minmax(0,1fr)_auto_auto] items-center gap-2 overflow-hidden rounded-[4px] px-4 py-2",
      "bg-[#322f35] text-[#f5eff7] shadow-[0_4px_8px_3px_rgb(0_0_0/0.15),0_1px_3px_0_rgb(0_0_0/0.3)] outline-none",
      "data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-[#d0bcff]",
      "data-entering:animate-in data-entering:slide-in-from-bottom-4 data-entering:fade-in-0 data-exiting:animate-out data-exiting:slide-out-to-bottom-4 data-exiting:fade-out-0",
      "dark:bg-[#e6e0e9] dark:text-[#322f35] dark:data-focus-visible:outline-[#6750a4]",
    ],
    content: "min-w-0 py-1",
    message: "line-clamp-2 text-sm leading-5",
    action:
      "relative z-10 text-[#d0bcff] dark:text-[#6750a4] data-disabled:text-[#f5eff7]/38 dark:data-disabled:text-[#322f35]/38",
    close:
      "[&_[data-slot=icon-button-surface]]:text-[#f5eff7] dark:[&_[data-slot=icon-button-surface]]:text-[#322f35]",
  },
});

type SnackbarSlotProps = Parameters<
  ReturnType<typeof mdSnackbarStyles>["root"]
>[0];

export function mdSnackbarVariants() {
  const styles = mdSnackbarStyles();

  return {
    action: (props?: SnackbarSlotProps) => styles.action(props),
    close: (props?: SnackbarSlotProps) => styles.close(props),
    content: (props?: SnackbarSlotProps) => styles.content(props),
    list: (props?: SnackbarSlotProps) => styles.list(props),
    message: (props?: SnackbarSlotProps) => styles.message(props),
    region: (props?: SnackbarSlotProps) => styles.region(props),
    root: (props?: SnackbarSlotProps) => styles.root(props),
  };
}

export type MDSnackbarRegionProps<
  T extends MDSnackbarContent = MDSnackbarContent,
> = Omit<RACToastRegionProps<T>, "children" | "className"> & {
  children?: RACToastRegionProps<T>["children"];
  className?: RACToastRegionProps<T>["className"];
};

export function MDSnackbarRegion<
  T extends MDSnackbarContent = MDSnackbarContent,
>({ children, className, ...props }: MDSnackbarRegionProps<T>) {
  const { region } = mdSnackbarVariants();

  return (
    <RACToastRegion
      className={composeRenderProps(className, (className) =>
        region({ className }),
      )}
      data-slot="snackbar-region"
      {...props}
    >
      {children ??
        (({ toast }: { toast: QueuedToast<T> }) => (
          <MDSnackbar toast={toast} />
        ))}
    </RACToastRegion>
  );
}

export type MDSnackbarProps<T extends MDSnackbarContent = MDSnackbarContent> =
  Omit<RACToastProps<T>, "children" | "className"> & {
    className?: RACToastProps<T>["className"];
  };

export function MDSnackbar<T extends MDSnackbarContent = MDSnackbarContent>({
  className,
  toast,
  ...props
}: MDSnackbarProps<T>) {
  const { action, close, content, message, root } = mdSnackbarVariants();
  const state = React.useContext(UNSTABLE_ToastStateContext);
  const snackbar = toast.content;

  function handleAction() {
    snackbar.onAction?.();
    state?.close(toast.key);
  }

  return (
    <RACToast
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="snackbar"
      toast={toast}
      {...props}
    >
      <RACToastContent className={content()} data-slot="snackbar-content">
        <span className={message()} data-slot="snackbar-message">
          {snackbar.message}
        </span>
      </RACToastContent>
      {snackbar.actionLabel === undefined ? null : (
        <MDButton className={action()} onPress={handleAction} variant="text">
          {snackbar.actionLabel}
        </MDButton>
      )}
      {snackbar.showCloseButton ? (
        <MDIconButton
          aria-label={snackbar.closeLabel ?? "Close snackbar"}
          className={close()}
          size="xs"
          slot="close"
          variant="standard"
        >
          <XIcon />
        </MDIconButton>
      ) : null}
    </RACToast>
  );
}
