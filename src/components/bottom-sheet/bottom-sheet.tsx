import type * as React from "react";
import { XIcon } from "lucide-react";
import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  IconButton,
  type IconButtonProps,
} from "@/components/icon-button/icon-button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

export const bottomSheetStyles = tv({
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
  ReturnType<typeof bottomSheetStyles>["content"]
>[0];

export function bottomSheetVariants() {
  const styles = bottomSheetStyles();

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

export type BottomSheetProps = Omit<
  React.ComponentPropsWithRef<typeof Drawer>,
  "showSwipeHandle" | "swipeDirection"
> & {
  showDragHandle?: boolean;
  swipeDirection?: React.ComponentPropsWithRef<typeof Drawer>["swipeDirection"];
};

export function BottomSheet({
  showDragHandle = true,
  swipeDirection = "down",
  ...props
}: BottomSheetProps) {
  return (
    <Drawer
      showSwipeHandle={showDragHandle}
      swipeDirection={swipeDirection}
      {...props}
    />
  );
}

export type BottomSheetTriggerProps = React.ComponentPropsWithRef<
  typeof DrawerTrigger
>;

export function BottomSheetTrigger(props: BottomSheetTriggerProps) {
  return <DrawerTrigger {...props} />;
}

export type BottomSheetContentProps = Omit<
  React.ComponentPropsWithRef<typeof DrawerContent>,
  "className"
> &
  VariantProps<typeof bottomSheetStyles> & {
    className?: string;
  };

export function BottomSheetContent({
  className,
  elevation,
  height,
  inset,
  ...props
}: BottomSheetContentProps) {
  const { content } = bottomSheetVariants();

  return (
    <DrawerContent
      className={content({ className, elevation, height, inset })}
      {...props}
    />
  );
}

export type BottomSheetHeaderProps = React.ComponentPropsWithRef<
  typeof DrawerHeader
>;

export function BottomSheetHeader({
  className,
  ...props
}: BottomSheetHeaderProps) {
  const { header } = bottomSheetVariants();

  return <DrawerHeader className={header({ className })} {...props} />;
}

export type BottomSheetTitleProps = Omit<
  React.ComponentPropsWithRef<typeof DrawerTitle>,
  "className"
> & {
  className?: string;
};

export function BottomSheetTitle({
  className,
  ...props
}: BottomSheetTitleProps) {
  const { title } = bottomSheetVariants();

  return <DrawerTitle className={title({ className })} {...props} />;
}

export type BottomSheetDescriptionProps = Omit<
  React.ComponentPropsWithRef<typeof DrawerDescription>,
  "className"
> & {
  className?: string;
};

export function BottomSheetDescription({
  className,
  ...props
}: BottomSheetDescriptionProps) {
  const { description } = bottomSheetVariants();

  return (
    <DrawerDescription className={description({ className })} {...props} />
  );
}

export type BottomSheetBodyProps = React.ComponentPropsWithRef<"div">;

export function BottomSheetBody({ className, ...props }: BottomSheetBodyProps) {
  const { body } = bottomSheetVariants();

  return (
    <div
      className={body({ className })}
      data-slot="bottom-sheet-body"
      {...props}
    />
  );
}

export type BottomSheetFooterProps = React.ComponentPropsWithRef<
  typeof DrawerFooter
>;

export function BottomSheetFooter({
  className,
  ...props
}: BottomSheetFooterProps) {
  const { footer } = bottomSheetVariants();

  return <DrawerFooter className={footer({ className })} {...props} />;
}

export type BottomSheetCloseProps = Omit<
  React.ComponentPropsWithRef<typeof DrawerClose>,
  "className"
> & {
  className?: string;
};

export function BottomSheetClose({
  className,
  ...props
}: BottomSheetCloseProps) {
  return <DrawerClose className={cn(className)} {...props} />;
}

export type BottomSheetCloseButtonProps = Omit<IconButtonProps, "children"> & {
  children?: IconButtonProps["children"];
};

export function BottomSheetCloseButton({
  "aria-label": ariaLabel = "Close bottom sheet",
  children = <XIcon />,
  className,
  size = "sm",
  variant = "standard",
  ...props
}: BottomSheetCloseButtonProps) {
  const { close } = bottomSheetVariants();

  return (
    <DrawerClose
      render={
        <IconButton
          aria-label={ariaLabel}
          className={composeRenderProps(className, (className) =>
            cn(close(), className),
          )}
          size={size}
          variant={variant}
          {...props}
        >
          {children}
        </IconButton>
      }
    />
  );
}
