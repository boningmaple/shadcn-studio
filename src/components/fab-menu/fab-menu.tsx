import * as React from "react";
import { PlusIcon } from "lucide-react";
import { composeRenderProps } from "react-aria-components";
import { tv } from "tailwind-variants";

import { FABButton, type FABButtonProps } from "@/components/fab/fab";
import {
  Menu,
  MenuItem,
  MenuTrigger,
  type MenuItemProps,
  type MenuProps,
  type MenuTriggerProps,
} from "@/components/menu/menu";
import { cn } from "@/lib/utils";

export const fabMenuStyles = tv({
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

type FABMenuSlotProps = Parameters<ReturnType<typeof fabMenuStyles>["menu"]>[0];

export function fabMenuVariants() {
  const styles = fabMenuStyles();

  return {
    item: (props?: FABMenuSlotProps) => styles.item(props),
    menu: (props?: FABMenuSlotProps) => styles.menu(props),
    popover: (props?: FABMenuSlotProps) => styles.popover(props),
    triggerIcon: (props?: FABMenuSlotProps) => styles.triggerIcon(props),
  };
}

export type FABMenuProps = Omit<MenuTriggerProps, "children" | "trigger"> &
  Pick<FABButtonProps, "color" | "lowered" | "size"> &
  Pick<MenuProps, "crossOffset" | "offset" | "placement"> & {
    children: React.ReactNode;
    label?: string;
    menuClassName?: string;
    popoverClassName?: string;
    trigger?: React.ReactNode;
  };

export function FABMenu({
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
}: FABMenuProps) {
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const open = isOpen ?? uncontrolledOpen;
  const { menu, popover, triggerIcon } = fabMenuVariants();

  function handleOpenChange(nextOpen: boolean) {
    if (isOpen === undefined) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <MenuTrigger isOpen={open} onOpenChange={handleOpenChange} {...props}>
      {trigger ?? (
        <FABButton
          aria-label={open ? "Close FAB menu" : label}
          color={color}
          lowered={lowered}
          size={size}
        >
          <PlusIcon
            aria-hidden="true"
            className={triggerIcon({ className: open && "rotate-45" })}
          />
        </FABButton>
      )}
      <Menu
        className={menu({ className: menuClassName })}
        crossOffset={crossOffset}
        offset={offset}
        placement={placement}
        popoverClassName={popover({ className: popoverClassName })}
      >
        {children}
      </Menu>
    </MenuTrigger>
  );
}

export type FABMenuItemProps = MenuItemProps;

export function FABMenuItem({ className, ...props }: FABMenuItemProps) {
  const { item } = fabMenuVariants();

  return (
    <MenuItem
      className={composeRenderProps(className, (className) =>
        cn(item(), className),
      )}
      {...props}
    />
  );
}
