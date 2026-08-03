import type * as React from "react";
import { XIcon } from "lucide-react";
import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  MDIconButton,
  type MDIconButtonProps,
} from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/ui/shadcn/react-aria/drawer";
import { cn } from "@/lib/utils";

export const mdBottomSheetStyles = tv({
  slots: {
    content: [
      "overflow-hidden border-0 bg-[#f7f2fa] text-[#1d1b20] outline-none",
      "[--drawer-bleed-background:#f7f2fa]",
      "data-[swipe-direction=down]:rounded-t-[28px]",
      "dark:bg-[#211f26] dark:text-[#e6e0e9] dark:[--drawer-bleed-background:#211f26]",
      "[&_[data-slot=drawer-swipe-handle]]:h-6 [&_[data-slot=drawer-swipe-handle]]:items-center",
      "[&_[data-slot=drawer-swipe-handle]:after]:h-1 [&_[data-slot=drawer-swipe-handle]:after]:w-8 [&_[data-slot=drawer-swipe-handle]:after]:bg-[#79747e]",
      "dark:[&_[data-slot=drawer-swipe-handle]:after]:bg-[#cac4d0]",
    ],
    header: "grid gap-1 px-6 pt-4 pb-2 text-left",
    title: "font-heading text-xl leading-7 font-normal tracking-normal",
    description: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    body: "min-h-0 overflow-y-auto px-6 py-2 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    footer: "flex flex-wrap items-center justify-end gap-2 px-6 pt-2 pb-6",
    close:
      "[&_[data-slot=icon-button-surface]]:text-[#49454f] dark:[&_[data-slot=icon-button-surface]]:text-[#cac4d0]",
  },
  variants: {
    elevation: {
      modal: {
        content:
          "shadow-[0_-4px_8px_3px_rgb(0_0_0/0.15),0_-1px_3px_0_rgb(0_0_0/0.3)]",
      },
      standard: {
        content:
          "shadow-[0_-1px_2px_0_rgb(0_0_0/0.3),0_-1px_3px_1px_rgb(0_0_0/0.15)]",
      },
    },
    height: {
      auto: {
        content: "[--drawer-height:auto]",
      },
      compact: {
        content: "[--drawer-height:18rem]",
      },
      medium: {
        content: "[--drawer-height:26rem]",
      },
      tall: {
        content: "[--drawer-height:calc(100dvh-6rem)]",
      },
    },
    inset: {
      false: {
        content: "[--drawer-inset:0px]",
      },
      true: {
        content: "[--drawer-inset:16px] sm:[--drawer-inset:24px]",
      },
    },
  },
  defaultVariants: {
    elevation: "modal",
    height: "auto",
    inset: false,
  },
});

type BottomSheetSlotProps = Parameters<
  ReturnType<typeof mdBottomSheetStyles>["content"]
>[0];

export function mdBottomSheetVariants() {
  const styles = mdBottomSheetStyles();

  return {
    body: (props?: BottomSheetSlotProps) => styles.body(props),
    close: (props?: BottomSheetSlotProps) => styles.close(props),
    content: (props?: BottomSheetSlotProps) => styles.content(props),
    description: (props?: BottomSheetSlotProps) => styles.description(props),
    footer: (props?: BottomSheetSlotProps) => styles.footer(props),
    header: (props?: BottomSheetSlotProps) => styles.header(props),
    title: (props?: BottomSheetSlotProps) => styles.title(props),
  };
}

export type MDBottomSheetProps = Omit<
  React.ComponentPropsWithRef<typeof Drawer>,
  "showSwipeHandle" | "swipeDirection"
> & {
  showDragHandle?: boolean;
  swipeDirection?: React.ComponentPropsWithRef<typeof Drawer>["swipeDirection"];
};

export function MDBottomSheet({
  showDragHandle = true,
  swipeDirection = "down",
  ...props
}: MDBottomSheetProps) {
  return (
    <Drawer
      showSwipeHandle={showDragHandle}
      swipeDirection={swipeDirection}
      {...props}
    />
  );
}

export type MDBottomSheetTriggerProps = React.ComponentPropsWithRef<
  typeof DrawerTrigger
>;

export function MDBottomSheetTrigger(props: MDBottomSheetTriggerProps) {
  return <DrawerTrigger {...props} />;
}

export type MDBottomSheetContentProps = Omit<
  React.ComponentPropsWithRef<typeof DrawerContent>,
  "className"
> &
  VariantProps<typeof mdBottomSheetStyles> & {
    className?: string;
  };

export function MDBottomSheetContent({
  className,
  elevation,
  height,
  inset,
  ...props
}: MDBottomSheetContentProps) {
  const { content } = mdBottomSheetVariants();

  return (
    <DrawerContent
      className={content({ className, elevation, height, inset })}
      {...props}
    />
  );
}

export type MDBottomSheetHeaderProps = React.ComponentPropsWithRef<
  typeof DrawerHeader
>;

export function MDBottomSheetHeader({
  className,
  ...props
}: MDBottomSheetHeaderProps) {
  const { header } = mdBottomSheetVariants();

  return <DrawerHeader className={header({ className })} {...props} />;
}

export type MDBottomSheetTitleProps = Omit<
  React.ComponentPropsWithRef<typeof DrawerTitle>,
  "className"
> & {
  className?: string;
};

export function MDBottomSheetTitle({
  className,
  ...props
}: MDBottomSheetTitleProps) {
  const { title } = mdBottomSheetVariants();

  return <DrawerTitle className={title({ className })} {...props} />;
}

export type MDBottomSheetDescriptionProps = Omit<
  React.ComponentPropsWithRef<typeof DrawerDescription>,
  "className"
> & {
  className?: string;
};

export function MDBottomSheetDescription({
  className,
  ...props
}: MDBottomSheetDescriptionProps) {
  const { description } = mdBottomSheetVariants();

  return (
    <DrawerDescription className={description({ className })} {...props} />
  );
}

export type MDBottomSheetBodyProps = React.ComponentPropsWithRef<"div">;

export function MDBottomSheetBody({
  className,
  ...props
}: MDBottomSheetBodyProps) {
  const { body } = mdBottomSheetVariants();

  return (
    <div
      className={body({ className })}
      data-slot="bottom-sheet-body"
      {...props}
    />
  );
}

export type MDBottomSheetFooterProps = React.ComponentPropsWithRef<
  typeof DrawerFooter
>;

export function MDBottomSheetFooter({
  className,
  ...props
}: MDBottomSheetFooterProps) {
  const { footer } = mdBottomSheetVariants();

  return <DrawerFooter className={footer({ className })} {...props} />;
}

export type MDBottomSheetCloseProps = Omit<
  React.ComponentPropsWithRef<typeof DrawerClose>,
  "className"
> & {
  className?: string;
};

export function MDBottomSheetClose({
  className,
  ...props
}: MDBottomSheetCloseProps) {
  return <DrawerClose className={cn(className)} {...props} />;
}

export type MDBottomSheetCloseButtonProps = Omit<
  MDIconButtonProps,
  "children"
> & {
  children?: MDIconButtonProps["children"];
};

export function MDBottomSheetCloseButton({
  "aria-label": ariaLabel = "Close bottom sheet",
  children = <XIcon />,
  className,
  size = "sm",
  variant = "standard",
  ...props
}: MDBottomSheetCloseButtonProps) {
  const { close } = mdBottomSheetVariants();

  return (
    <DrawerClose
      render={
        <MDIconButton
          aria-label={ariaLabel}
          className={composeRenderProps(className, (className) =>
            cn(close(), className),
          )}
          size={size}
          variant={variant}
          {...props}
        >
          {children}
        </MDIconButton>
      }
    />
  );
}
