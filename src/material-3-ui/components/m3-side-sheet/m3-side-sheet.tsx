import type * as React from "react";
import { XIcon } from "lucide-react";
import { composeRenderProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import {
  M3IconButton,
  type M3IconButtonProps,
} from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  SheetContent,
  SheetDescription,
  SheetTitle,
  SheetTrigger,
} from "@/ui/shadcn/react-aria/sheet";
import { Sidebar, SidebarProvider } from "@/ui/shadcn/react-aria/sidebar";
import { cn } from "@/lib/utils";

export const m3SideSheetStyles = tv({
  slots: {
    standard: [
      "flex min-h-[28rem] w-(--sidebar-width) max-w-full flex-col overflow-hidden border-[#cac4d0] bg-[#f7f2fa] text-[#1d1b20]",
      "data-[side=left]:border-r data-[side=right]:border-l",
      "dark:border-[#49454f] dark:bg-[#211f26] dark:text-[#e6e0e9]",
    ],
    modal: [
      "gap-0 overflow-hidden border-[#cac4d0] bg-[#f7f2fa] text-[#1d1b20]",
      "!w-[min(100vw,25rem)] !max-w-none shadow-[0_8px_12px_6px_rgb(0_0_0/0.15),0_4px_4px_0_rgb(0_0_0/0.3)]",
      "data-[side=left]:rounded-r-[28px] data-[side=right]:rounded-l-[28px]",
      "dark:border-[#49454f] dark:bg-[#211f26] dark:text-[#e6e0e9]",
    ],
    header: "flex min-h-16 shrink-0 items-center gap-2 px-4",
    title:
      "font-heading min-w-0 flex-1 truncate text-xl leading-7 font-normal tracking-normal text-[#1d1b20] dark:text-[#e6e0e9]",
    description: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    body: "min-h-0 flex-1 overflow-y-auto px-6 py-2 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    footer:
      "flex shrink-0 flex-wrap items-center justify-end gap-2 border-t border-[#cac4d0] px-6 py-4 dark:border-[#49454f]",
    divider: "h-px shrink-0 bg-[#cac4d0] dark:bg-[#49454f]",
    close:
      "[&_[data-slot=icon-button-surface]]:text-[#49454f] dark:[&_[data-slot=icon-button-surface]]:text-[#cac4d0]",
  },
});

type SideSheetSlotProps = Parameters<
  ReturnType<typeof m3SideSheetStyles>["standard"]
>[0];

export function m3SideSheetVariants() {
  const styles = m3SideSheetStyles();

  return {
    body: (props?: SideSheetSlotProps) => styles.body(props),
    close: (props?: SideSheetSlotProps) => styles.close(props),
    description: (props?: SideSheetSlotProps) => styles.description(props),
    divider: (props?: SideSheetSlotProps) => styles.divider(props),
    footer: (props?: SideSheetSlotProps) => styles.footer(props),
    header: (props?: SideSheetSlotProps) => styles.header(props),
    modal: (props?: SideSheetSlotProps) => styles.modal(props),
    standard: (props?: SideSheetSlotProps) => styles.standard(props),
    title: (props?: SideSheetSlotProps) => styles.title(props),
  };
}

export type M3SideSheetTriggerProps = React.ComponentPropsWithRef<
  typeof SheetTrigger
>;

export function M3SideSheetTrigger(props: M3SideSheetTriggerProps) {
  return <SheetTrigger {...props} />;
}

export type M3StandardSideSheetProps = Omit<
  React.ComponentPropsWithRef<typeof SidebarProvider>,
  "children" | "className"
> & {
  children: React.ReactNode;
  className?: string;
  providerClassName?: string;
  side?: "left" | "right";
  width?: string;
};

export function M3StandardSideSheet({
  children,
  className,
  providerClassName,
  side = "right",
  style,
  width = "22.5rem",
  ...props
}: M3StandardSideSheetProps) {
  const { standard } = m3SideSheetVariants();

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
        className={standard({ className })}
        collapsible="none"
        data-side={side}
        side={side}
      >
        {children}
      </Sidebar>
    </SidebarProvider>
  );
}

export type M3ModalSideSheetProps = Omit<
  React.ComponentPropsWithRef<typeof SheetContent>,
  "className" | "side"
> & {
  className?: string;
  side?: "left" | "right";
};

export function M3ModalSideSheet({
  className,
  side = "right",
  showCloseButton = false,
  ...props
}: M3ModalSideSheetProps) {
  const { modal } = m3SideSheetVariants();

  return (
    <SheetContent
      className={modal({ className })}
      showCloseButton={showCloseButton}
      side={side}
      {...props}
    />
  );
}

export type M3SideSheetHeaderProps = React.ComponentPropsWithRef<"div">;

export function M3SideSheetHeader({
  className,
  ...props
}: M3SideSheetHeaderProps) {
  const { header } = m3SideSheetVariants();

  return (
    <div
      className={header({ className })}
      data-slot="side-sheet-header"
      {...props}
    />
  );
}

export type M3SideSheetTitleProps = Omit<
  React.ComponentPropsWithRef<typeof SheetTitle>,
  "className"
> & {
  className?: string;
};

export function M3SideSheetTitle({
  className,
  ...props
}: M3SideSheetTitleProps) {
  const { title } = m3SideSheetVariants();

  return <SheetTitle className={title({ className })} {...props} />;
}

export type M3SideSheetDescriptionProps = Omit<
  React.ComponentPropsWithRef<typeof SheetDescription>,
  "className"
> & {
  className?: string;
};

export function M3SideSheetDescription({
  className,
  ...props
}: M3SideSheetDescriptionProps) {
  const { description } = m3SideSheetVariants();

  return <SheetDescription className={description({ className })} {...props} />;
}

export type M3SideSheetBodyProps = React.ComponentPropsWithRef<"div">;

export function M3SideSheetBody({ className, ...props }: M3SideSheetBodyProps) {
  const { body } = m3SideSheetVariants();

  return (
    <div
      className={body({ className })}
      data-slot="side-sheet-body"
      {...props}
    />
  );
}

export type M3SideSheetFooterProps = React.ComponentPropsWithRef<"div">;

export function M3SideSheetFooter({
  className,
  ...props
}: M3SideSheetFooterProps) {
  const { footer } = m3SideSheetVariants();

  return (
    <div
      className={footer({ className })}
      data-slot="side-sheet-footer"
      {...props}
    />
  );
}

export type M3SideSheetDividerProps = React.ComponentPropsWithRef<"div">;

export function M3SideSheetDivider({
  className,
  ...props
}: M3SideSheetDividerProps) {
  const { divider } = m3SideSheetVariants();

  return (
    <div
      className={divider({ className })}
      data-slot="side-sheet-divider"
      {...props}
    />
  );
}

export type M3SideSheetCloseButtonProps = Omit<
  M3IconButtonProps,
  "children"
> & {
  children?: M3IconButtonProps["children"];
};

export function M3SideSheetCloseButton({
  "aria-label": ariaLabel = "Close side sheet",
  children = <XIcon />,
  className,
  size = "sm",
  slot = "close",
  variant = "standard",
  ...props
}: M3SideSheetCloseButtonProps) {
  const { close } = m3SideSheetVariants();

  return (
    <M3IconButton
      aria-label={ariaLabel}
      className={composeRenderProps(className, (className) =>
        cn(close(), className),
      )}
      size={size}
      slot={slot}
      variant={variant}
      {...props}
    >
      {children}
    </M3IconButton>
  );
}
