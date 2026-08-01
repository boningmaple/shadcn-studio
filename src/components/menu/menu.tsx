import type * as React from "react";
import { CheckIcon, ChevronRightIcon } from "lucide-react";
import {
  Header as RACHeader,
  Keyboard as RACKeyboard,
  Menu as RACMenu,
  MenuItem as RACMenuItem,
  MenuSection as RACMenuSection,
  MenuTrigger as RACMenuTrigger,
  Popover as RACPopover,
  Separator as RACSeparator,
  SubmenuTrigger as RACSubmenuTrigger,
  Text as RACText,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const menuStyles = tv({
  slots: {
    popover: [
      "z-50 min-w-48 overflow-hidden rounded-[4px]",
      "bg-[#f7f2fa] text-[#1d1b20]",
      "shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]",
      "outline-none data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95",
      "dark:bg-[#211f26] dark:text-[#e6e0e9]",
    ],
    menu: "grid max-h-[min(28rem,var(--visual-viewport-height)-2rem)] gap-0 overflow-y-auto p-2 outline-none",
    section: "grid gap-0 py-1",
    header:
      "px-3 py-2 text-xs leading-4 font-medium tracking-[0.1px] text-[#49454f] dark:text-[#cac4d0]",
    item: [
      "group/menu-item relative grid min-h-12 cursor-pointer grid-cols-[24px_minmax(0,1fr)_auto] items-center gap-3 rounded-[4px] px-3 py-1 text-sm leading-5 outline-none select-none",
      "text-[#1d1b20] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "data-hovered:before:opacity-[0.08] data-focused:before:opacity-[0.1] data-pressed:before:opacity-[0.1]",
      "data-disabled:cursor-not-allowed data-disabled:text-[#1D1B20]/38 data-disabled:before:opacity-0",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
    ],
    icon: [
      "relative z-10 flex size-6 items-center justify-center text-[#49454f]",
      "group-data-selected/menu-item:text-[#6750a4]",
      "group-data-disabled/menu-item:text-[#1D1B20]/38",
      "dark:text-[#cac4d0] dark:group-data-selected/menu-item:text-[#d0bcff] dark:group-data-disabled/menu-item:text-[#E6E0E9]/38",
      "[&_svg]:size-5 [&_svg]:shrink-0",
    ],
    content: "relative z-10 grid min-w-0 gap-0.5",
    label: "truncate text-sm leading-5 font-normal",
    description:
      "truncate text-xs leading-4 text-[#49454f] dark:text-[#cac4d0]",
    keyboard:
      "relative z-10 text-xs leading-4 text-[#49454f] dark:text-[#cac4d0]",
    submenuIcon: "relative z-10 size-4 text-[#49454f] dark:text-[#cac4d0]",
    separator: "my-2 bg-[#cac4d0] dark:bg-[#49454f]",
  },
});

type MenuSlotProps = Parameters<ReturnType<typeof menuStyles>["menu"]>[0];

export function menuVariants() {
  const styles = menuStyles();

  return {
    content: (props?: MenuSlotProps) => styles.content(props),
    description: (props?: MenuSlotProps) => styles.description(props),
    header: (props?: MenuSlotProps) => styles.header(props),
    icon: (props?: MenuSlotProps) => styles.icon(props),
    item: (props?: MenuSlotProps) => styles.item(props),
    keyboard: (props?: MenuSlotProps) => styles.keyboard(props),
    label: (props?: MenuSlotProps) => styles.label(props),
    menu: (props?: MenuSlotProps) => styles.menu(props),
    popover: (props?: MenuSlotProps) => styles.popover(props),
    section: (props?: MenuSlotProps) => styles.section(props),
    separator: (props?: MenuSlotProps) => styles.separator(props),
    submenuIcon: (props?: MenuSlotProps) => styles.submenuIcon(props),
  };
}

export type MenuTriggerProps = React.ComponentPropsWithRef<
  typeof RACMenuTrigger
>;

export function MenuTrigger(props: MenuTriggerProps) {
  return <RACMenuTrigger {...props} />;
}

type MenuPopoverProps = Pick<
  React.ComponentPropsWithRef<typeof RACPopover>,
  "crossOffset" | "offset" | "placement" | "shouldFlip"
>;

export type MenuProps = Omit<
  React.ComponentPropsWithRef<typeof RACMenu>,
  "className"
> &
  MenuPopoverProps &
  VariantProps<typeof menuStyles> & {
    className?: string;
    popoverClassName?: string;
  };

export function Menu({
  className,
  crossOffset,
  offset = 8,
  placement = "bottom start",
  popoverClassName,
  shouldFlip,
  ...props
}: MenuProps) {
  const { menu, popover } = menuVariants();

  return (
    <RACPopover
      className={popover({ className: popoverClassName })}
      crossOffset={crossOffset}
      data-slot="menu-popover"
      offset={offset}
      placement={placement}
      shouldFlip={shouldFlip}
    >
      <RACMenu
        className={composeRenderProps(className, (className) =>
          menu({ className }),
        )}
        data-slot="menu"
        {...props}
      />
    </RACPopover>
  );
}

export type MenuItemProps = Omit<
  React.ComponentPropsWithRef<typeof RACMenuItem>,
  "children"
> & {
  children: React.ReactNode;
  description?: React.ReactNode;
  icon?: React.ReactNode;
  shortcut?: React.ReactNode;
};

export function MenuItem({
  children,
  className,
  description,
  icon: iconContent,
  shortcut,
  textValue,
  ...props
}: MenuItemProps) {
  const {
    content,
    description: descriptionClassName,
    icon,
    item,
    keyboard,
    label,
    submenuIcon,
  } = menuVariants();
  const resolvedTextValue =
    textValue ?? (typeof children === "string" ? children : undefined);

  return (
    <RACMenuItem
      className={composeRenderProps(className, (className) =>
        item({ className }),
      )}
      data-slot="menu-item"
      textValue={resolvedTextValue}
      {...props}
    >
      {composeRenderProps(children, (children, { hasSubmenu, isSelected }) => (
        <>
          <span className={icon()} data-slot="menu-item-icon">
            {isSelected ? (
              <CheckIcon aria-hidden="true" />
            ) : iconContent === undefined ? null : (
              iconContent
            )}
          </span>
          <span className={content()} data-slot="menu-item-content">
            <RACText className={label()} slot="label">
              {children}
            </RACText>
            {description === undefined ? null : (
              <RACText className={descriptionClassName()} slot="description">
                {description}
              </RACText>
            )}
          </span>
          {hasSubmenu ? (
            <ChevronRightIcon aria-hidden="true" className={submenuIcon()} />
          ) : shortcut === undefined ? (
            <span aria-hidden="true" />
          ) : (
            <RACKeyboard className={keyboard()}>{shortcut}</RACKeyboard>
          )}
        </>
      ))}
    </RACMenuItem>
  );
}

export type MenuSectionProps = Omit<
  React.ComponentPropsWithRef<typeof RACMenuSection>,
  "children"
> & {
  children?: React.ReactNode;
  title?: React.ReactNode;
};

export function MenuSection({
  children,
  className,
  title,
  ...props
}: MenuSectionProps) {
  const { header, section } = menuVariants();

  return (
    <RACMenuSection
      className={section({ className })}
      data-slot="menu-section"
      {...props}
    >
      {title === undefined ? null : (
        <RACHeader className={header()} data-slot="menu-section-header">
          {title}
        </RACHeader>
      )}
      {children}
    </RACMenuSection>
  );
}

export type MenuSeparatorProps = React.ComponentPropsWithRef<
  typeof RACSeparator
>;

export function MenuSeparator({ className, ...props }: MenuSeparatorProps) {
  const { separator } = menuVariants();

  return (
    <RACSeparator
      className={separator({ className })}
      data-slot="menu-separator"
      {...props}
    />
  );
}

export type SubmenuProps = React.ComponentPropsWithRef<
  typeof RACSubmenuTrigger
>;

export function Submenu(props: SubmenuProps) {
  return <RACSubmenuTrigger {...props} />;
}

export { RACKeyboard as MenuKeyboard, RACText as MenuText };
