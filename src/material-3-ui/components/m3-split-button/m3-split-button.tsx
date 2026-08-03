import type * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  M3Button,
  type M3ButtonProps,
} from "@/material-3-ui/components/m3-button/m3-button";
import { M3IconButton } from "@/material-3-ui/components/m3-icon-button/m3-icon-button";
import {
  M3Menu,
  M3MenuItem,
  M3MenuTrigger,
  type M3MenuItemProps,
  type M3MenuProps,
} from "@/material-3-ui/components/m3-menu/m3-menu";
import { cn } from "@/lib/utils";

export const m3SplitButtonStyles = tv({
  slots: {
    root: "inline-flex w-fit max-w-full items-center gap-1 rounded-full",
    action:
      "rounded-e-[12px] data-pressed:rounded-e-[8px] data-disabled:rounded-e-[12px]",
    menuButton:
      "min-w-0 rounded-s-[12px] data-pressed:rounded-s-[8px] data-disabled:rounded-s-[12px]",
    menuIcon:
      "transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)] group-data-[open=true]/split-button:rotate-180",
  },
  variants: {
    size: {
      xs: {
        action: "rounded-e-[10px]",
        menuButton: "rounded-s-[10px]",
      },
      sm: {},
      md: {
        action: "rounded-e-[16px] data-pressed:rounded-e-[12px]",
        menuButton: "rounded-s-[16px] data-pressed:rounded-s-[12px]",
      },
      lg: {
        action: "rounded-e-[28px] data-pressed:rounded-e-[16px]",
        menuButton: "rounded-s-[28px] data-pressed:rounded-s-[16px]",
      },
      xl: {
        action: "rounded-e-[28px] data-pressed:rounded-e-[16px]",
        menuButton: "rounded-s-[28px] data-pressed:rounded-s-[16px]",
      },
    },
  },
  defaultVariants: {
    size: "sm",
  },
});

export type M3SplitButtonVariantProps = VariantProps<
  typeof m3SplitButtonStyles
>;

export type M3SplitButtonProps = Omit<M3ButtonProps, "shape"> &
  Pick<M3MenuProps, "placement"> &
  M3SplitButtonVariantProps & {
    menuAriaLabel?: string;
    menuItems: React.ReactNode;
    rootClassName?: string;
  };

export function M3SplitButton({
  children,
  className,
  menuAriaLabel = "Show more actions",
  menuItems,
  placement = "bottom end",
  rootClassName,
  size = "sm",
  variant = "filled",
  ...props
}: M3SplitButtonProps) {
  const styles = m3SplitButtonStyles({ size });
  const menuButtonVariant =
    variant === "outlined"
      ? "outlined"
      : variant === "tonal"
        ? "tonal"
        : variant === "text"
          ? "standard"
          : "filled";

  return (
    <div
      className={styles.root({
        className: cn("group/split-button", rootClassName),
      })}
      data-slot="split-button"
    >
      <M3Button
        className={composeRenderProps(className, (className) =>
          styles.action({ className }),
        )}
        shape="square"
        size={size}
        variant={variant}
        {...props}
      >
        {children}
      </M3Button>
      <M3MenuTrigger>
        <M3IconButton
          aria-label={menuAriaLabel}
          className={styles.menuButton()}
          shape="square"
          size={size}
          variant={menuButtonVariant}
        >
          <ChevronDownIcon className={styles.menuIcon()} />
        </M3IconButton>
        <M3Menu placement={placement}>{menuItems}</M3Menu>
      </M3MenuTrigger>
    </div>
  );
}

export type M3SplitButtonMenuItemProps = M3MenuItemProps;

export function M3SplitButtonMenuItem(props: M3SplitButtonMenuItemProps) {
  return <M3MenuItem {...props} />;
}
