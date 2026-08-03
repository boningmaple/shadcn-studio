import * as React from "react";
import { PlusIcon } from "lucide-react";
import { composeRenderProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import {
  MDFABButton,
  type MDFABButtonProps,
} from "@/ui/material-design/components/md-fab/md-fab";
import {
  MDMenu,
  MDMenuItem,
  MDMenuTrigger,
  type MDMenuItemProps,
  type MDMenuProps,
  type MDMenuTriggerProps,
} from "@/ui/material-design/components/md-menu/md-menu";
import { cn } from "@/lib/utils";

export const mdFabMenuStyles = tv({
  slots: {
    menu: "min-w-56 gap-2 p-2",
    popover:
      "rounded-[20px] bg-transparent shadow-none data-entering:zoom-in-100 data-exiting:zoom-out-100",
    item: [
      "min-h-14 rounded-[16px] bg-[#eaddff] text-[#21005d]",
      "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
      "data-hovered:rounded-[18px] data-pressed:rounded-[14px]",
      "dark:bg-[#4f378b] dark:text-[#eaddff]",
    ],
    triggerIcon:
      "transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
  },
});

type FABMenuSlotProps = Parameters<
  ReturnType<typeof mdFabMenuStyles>["menu"]
>[0];

export function mdFabMenuVariants() {
  const styles = mdFabMenuStyles();

  return {
    item: (props?: FABMenuSlotProps) => styles.item(props),
    menu: (props?: FABMenuSlotProps) => styles.menu(props),
    popover: (props?: FABMenuSlotProps) => styles.popover(props),
    triggerIcon: (props?: FABMenuSlotProps) => styles.triggerIcon(props),
  };
}

export type MDFABMenuProps = Omit<MDMenuTriggerProps, "children" | "trigger"> &
  Pick<MDFABButtonProps, "color" | "lowered" | "size"> &
  Pick<MDMenuProps, "crossOffset" | "offset" | "placement"> & {
    children: React.ReactNode;
    label?: string;
    menuClassName?: string;
    popoverClassName?: string;
    trigger?: React.ReactNode;
  };

export function MDFABMenu({
  children,
  color = "primary",
  crossOffset,
  defaultOpen = false,
  isOpen,
  label = "Open FAB menu",
  lowered,
  menuClassName,
  offset = 12,
  onOpenChange,
  placement = "top end",
  popoverClassName,
  size = "medium",
  trigger,
  ...props
}: MDFABMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isOpen ?? uncontrolledOpen;
  const { menu, popover, triggerIcon } = mdFabMenuVariants();

  function handleOpenChange(nextOpen: boolean) {
    if (isOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <MDMenuTrigger isOpen={open} onOpenChange={handleOpenChange} {...props}>
      {trigger ?? (
        <MDFABButton
          aria-label={open ? "Close FAB menu" : label}
          color={color}
          lowered={lowered}
          size={size}
        >
          <PlusIcon
            aria-hidden="true"
            className={triggerIcon({ className: open && "rotate-45" })}
          />
        </MDFABButton>
      )}
      <MDMenu
        className={menu({ className: menuClassName })}
        crossOffset={crossOffset}
        offset={offset}
        placement={placement}
        popoverClassName={popover({ className: popoverClassName })}
      >
        {children}
      </MDMenu>
    </MDMenuTrigger>
  );
}

export type MDFABMenuItemProps = MDMenuItemProps;

export function MDFABMenuItem({ className, ...props }: MDFABMenuItemProps) {
  const { item } = mdFabMenuVariants();

  return (
    <MDMenuItem
      className={composeRenderProps(className, (className) =>
        cn(item(), className),
      )}
      {...props}
    />
  );
}
