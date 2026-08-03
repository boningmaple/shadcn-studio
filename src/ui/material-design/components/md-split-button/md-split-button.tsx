import type * as React from "react";
import { ChevronDownIcon } from "lucide-react";
import { composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  MDButton,
  type MDButtonProps,
} from "@/ui/material-design/components/md-button/md-button";
import { MDIconButton } from "@/ui/material-design/components/md-icon-button/md-icon-button";
import {
  MDMenu,
  MDMenuItem,
  MDMenuTrigger,
  type MDMenuItemProps,
  type MDMenuProps,
} from "@/ui/material-design/components/md-menu/md-menu";
import { cn } from "@/lib/utils";

export const mdSplitButtonStyles = tv({
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

export type MDSplitButtonVariantProps = VariantProps<
  typeof mdSplitButtonStyles
>;

export type MDSplitButtonProps = Omit<MDButtonProps, "shape"> &
  Pick<MDMenuProps, "placement"> &
  MDSplitButtonVariantProps & {
    menuAriaLabel?: string;
    menuItems: React.ReactNode;
    rootClassName?: string;
  };

export function MDSplitButton({
  children,
  className,
  menuAriaLabel = "Show more actions",
  menuItems,
  placement = "bottom end",
  rootClassName,
  size = "sm",
  variant = "filled",
  ...props
}: MDSplitButtonProps) {
  const styles = mdSplitButtonStyles({ size });
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
      <MDButton
        className={composeRenderProps(className, (className) =>
          styles.action({ className }),
        )}
        shape="square"
        size={size}
        variant={variant}
        {...props}
      >
        {children}
      </MDButton>
      <MDMenuTrigger>
        <MDIconButton
          aria-label={menuAriaLabel}
          className={styles.menuButton()}
          shape="square"
          size={size}
          variant={menuButtonVariant}
        >
          <ChevronDownIcon className={styles.menuIcon()} />
        </MDIconButton>
        <MDMenu placement={placement}>{menuItems}</MDMenu>
      </MDMenuTrigger>
    </div>
  );
}

export type MDSplitButtonMenuItemProps = MDMenuItemProps;

export function MDSplitButtonMenuItem(props: MDSplitButtonMenuItemProps) {
  return <MDMenuItem {...props} />;
}
