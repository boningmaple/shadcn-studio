import * as React from "react";
import { PlusIcon } from "lucide-react";
import { composeRenderProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import {
  M3FABButton,
  type M3FABButtonProps,
} from "@/material-3-ui/components/m3-fab/m3-fab";
import {
  M3Menu,
  M3MenuItem,
  M3MenuTrigger,
  type M3MenuItemProps,
  type M3MenuProps,
  type M3MenuTriggerProps,
} from "@/material-3-ui/components/m3-menu/m3-menu";
import { cn } from "@/lib/utils";

export const m3FabMenuStyles = tv({
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
  ReturnType<typeof m3FabMenuStyles>["menu"]
>[0];

export function m3FabMenuVariants() {
  const styles = m3FabMenuStyles();

  return {
    item: (props?: FABMenuSlotProps) => styles.item(props),
    menu: (props?: FABMenuSlotProps) => styles.menu(props),
    popover: (props?: FABMenuSlotProps) => styles.popover(props),
    triggerIcon: (props?: FABMenuSlotProps) => styles.triggerIcon(props),
  };
}

export type M3FABMenuProps = Omit<M3MenuTriggerProps, "children" | "trigger"> &
  Pick<M3FABButtonProps, "color" | "lowered" | "size"> &
  Pick<M3MenuProps, "crossOffset" | "offset" | "placement"> & {
    children: React.ReactNode;
    label?: string;
    menuClassName?: string;
    popoverClassName?: string;
    trigger?: React.ReactNode;
  };

export function M3FABMenu({
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
}: M3FABMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isOpen ?? uncontrolledOpen;
  const { menu, popover, triggerIcon } = m3FabMenuVariants();

  function handleOpenChange(nextOpen: boolean) {
    if (isOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <M3MenuTrigger isOpen={open} onOpenChange={handleOpenChange} {...props}>
      {trigger ?? (
        <M3FABButton
          aria-label={open ? "Close FAB menu" : label}
          color={color}
          lowered={lowered}
          size={size}
        >
          <PlusIcon
            aria-hidden="true"
            className={triggerIcon({ className: open && "rotate-45" })}
          />
        </M3FABButton>
      )}
      <M3Menu
        className={menu({ className: menuClassName })}
        crossOffset={crossOffset}
        offset={offset}
        placement={placement}
        popoverClassName={popover({ className: popoverClassName })}
      >
        {children}
      </M3Menu>
    </M3MenuTrigger>
  );
}

export type M3FABMenuItemProps = M3MenuItemProps;

export function M3FABMenuItem({ className, ...props }: M3FABMenuItemProps) {
  const { item } = m3FabMenuVariants();

  return (
    <M3MenuItem
      className={composeRenderProps(className, (className) =>
        cn(item(), className),
      )}
      {...props}
    />
  );
}
