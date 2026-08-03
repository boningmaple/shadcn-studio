import * as React from "react";
import { CheckIcon } from "lucide-react";
import {
  ToggleButtonGroup as RACToggleButtonGroup,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

import {
  MDToggleButton,
  type MDToggleButtonProps,
} from "@/ui/material-design/components/md-toggle-button/md-toggle-button";

export const mdSegmentedButtonStyles = tv({
  slots: {
    group: [
      "inline-flex w-fit max-w-full items-stretch overflow-hidden rounded-full border border-[#79747e]",
      "bg-transparent text-[#49454f] outline-none",
      "dark:border-[#938f99] dark:text-[#cac4d0]",
      "data-[orientation=vertical]:flex-col",
      "[&>[data-slot=segmented-button]:not(:last-child)]:border-e [&>[data-slot=segmented-button]:not(:last-child)]:border-[#79747e]",
      "dark:[&>[data-slot=segmented-button]:not(:last-child)]:border-[#938f99]",
      "data-[orientation=vertical]:[&>[data-slot=segmented-button]:not(:last-child)]:border-e-0 data-[orientation=vertical]:[&>[data-slot=segmented-button]:not(:last-child)]:border-b",
    ],
    button: [
      "h-10 min-w-12 rounded-none border-0 bg-transparent px-4 text-sm leading-5 font-medium text-current shadow-none",
      "data-selected:bg-[#e8def8] data-selected:text-[#1d192b]",
      "data-pressed:rounded-none data-selected:rounded-none data-selected:data-pressed:rounded-none",
      "data-disabled:bg-transparent data-disabled:text-[#1D1B20]/38",
      "data-selected:data-disabled:bg-[#1D1B20]/10 data-selected:data-disabled:text-[#1D1B20]/38",
      "dark:data-selected:bg-[#4a4458] dark:data-selected:text-[#e8def8]",
      "dark:data-disabled:bg-transparent dark:data-disabled:text-[#E6E0E9]/38",
      "dark:data-selected:data-disabled:bg-[#E6E0E9]/10 dark:data-selected:data-disabled:text-[#E6E0E9]/38",
    ],
    content: "relative z-10 flex items-center justify-center gap-2",
    icon: "flex size-5 shrink-0 items-center justify-center [&_svg]:size-5",
  },
  variants: {
    density: {
      compact: {
        group: "rounded-[20px]",
        button: "h-8 px-3 text-xs leading-4",
      },
      default: {},
    },
    equalWidth: {
      true: {
        button: "flex-1",
      },
      false: {},
    },
  },
  defaultVariants: {
    density: "default",
    equalWidth: false,
  },
});

export type MDSegmentedButtonVariantProps = VariantProps<
  typeof mdSegmentedButtonStyles
>;
type SegmentedButtonSlotProps = Parameters<
  ReturnType<typeof mdSegmentedButtonStyles>["group"]
>[0];

export function mdSegmentedButtonVariants({
  density = "default",
  equalWidth = false,
}: MDSegmentedButtonVariantProps = {}) {
  const resolve = () => mdSegmentedButtonStyles({ density, equalWidth });

  return {
    button: (props?: SegmentedButtonSlotProps) => resolve().button(props),
    content: (props?: SegmentedButtonSlotProps) => resolve().content(props),
    group: (props?: SegmentedButtonSlotProps) => resolve().group(props),
    icon: (props?: SegmentedButtonSlotProps) => resolve().icon(props),
  };
}

type SegmentedButtonStyleContextValue = {
  density: NonNullable<MDSegmentedButtonVariantProps["density"]>;
  equalWidth: NonNullable<MDSegmentedButtonVariantProps["equalWidth"]>;
};

const SegmentedButtonStyleContext =
  React.createContext<SegmentedButtonStyleContextValue>({
    density: "default",
    equalWidth: false,
  });

export type MDSegmentedButtonGroupProps = React.ComponentPropsWithRef<
  typeof RACToggleButtonGroup
> &
  MDSegmentedButtonVariantProps;

export function MDSegmentedButtonGroup({
  className,
  density = "default",
  equalWidth = false,
  ...props
}: MDSegmentedButtonGroupProps) {
  const { group } = mdSegmentedButtonVariants({ density, equalWidth });

  return (
    <SegmentedButtonStyleContext.Provider value={{ density, equalWidth }}>
      <RACToggleButtonGroup
        className={composeRenderProps(className, (className) =>
          group({ className }),
        )}
        data-density={density}
        data-slot="segmented-button-group"
        {...props}
      />
    </SegmentedButtonStyleContext.Provider>
  );
}

export type MDSegmentedButtonProps = Omit<
  MDToggleButtonProps,
  "shape" | "size" | "variant"
> & {
  icon?: React.ReactNode;
  showSelectedIcon?: boolean;
};

export function MDSegmentedButton({
  children,
  className,
  icon: iconContent,
  showSelectedIcon = true,
  ...props
}: MDSegmentedButtonProps) {
  const { density, equalWidth } = React.useContext(SegmentedButtonStyleContext);
  const {
    button,
    content,
    icon: iconClassName,
  } = mdSegmentedButtonVariants({ density, equalWidth });

  return (
    <MDToggleButton
      className={composeRenderProps(className, (className) =>
        button({ className }),
      )}
      data-slot="segmented-button"
      shape="square"
      size="sm"
      variant="outlined"
      {...props}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <span className={content()} data-slot="segmented-button-content">
          {showSelectedIcon && isSelected ? (
            <span className={iconClassName()} data-slot="segmented-button-icon">
              <CheckIcon aria-hidden="true" />
            </span>
          ) : iconContent === undefined ? null : (
            <span className={iconClassName()} data-slot="segmented-button-icon">
              {iconContent}
            </span>
          )}
          {children}
        </span>
      ))}
    </MDToggleButton>
  );
}
