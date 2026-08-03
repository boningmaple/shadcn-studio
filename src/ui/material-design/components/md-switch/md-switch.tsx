import type * as React from "react";
import { CheckIcon } from "lucide-react";
import { Switch as RACSwitch, composeRenderProps } from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const mdSwitchStyles = tv({
  slots: {
    root: [
      "group/switch inline-flex min-h-12 w-fit max-w-full cursor-pointer items-center gap-3 rounded-[4px] text-[#1d1b20] outline-none select-none",
      "data-disabled:cursor-not-allowed data-disabled:text-[#1D1B20]/38",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    control: "relative flex size-12 shrink-0 items-center justify-center",
    track: [
      "relative flex h-8 w-[52px] shrink-0 items-center rounded-full border-2 bg-[#e6e0e9] text-[#1d1b20]",
      "border-[#79747e]",
      "transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-hovered/switch:before:opacity-[0.08]",
      "group-data-focus-visible/switch:before:opacity-[0.1]",
      "group-data-pressed/switch:before:opacity-[0.1]",
      "group-data-selected/switch:border-transparent group-data-selected/switch:bg-[#6750a4] group-data-selected/switch:text-[#6750a4]",
      "group-data-disabled/switch:border-[#1D1B20]/12 group-data-disabled/switch:bg-[#1D1B20]/12 group-data-disabled/switch:before:opacity-0",
      "group-data-selected/switch:group-data-disabled/switch:border-transparent group-data-selected/switch:group-data-disabled/switch:bg-[#1D1B20]/12",
      "dark:bg-[#49454f] dark:text-[#e6e0e9]",
      "dark:border-[#938f99]",
      "dark:group-data-selected/switch:bg-[#d0bcff] dark:group-data-selected/switch:text-[#d0bcff]",
      "dark:group-data-disabled/switch:border-[#E6E0E9]/12 dark:group-data-disabled/switch:bg-[#E6E0E9]/12",
      "dark:group-data-selected/switch:group-data-disabled/switch:bg-[#E6E0E9]/12",
      "motion-reduce:transition-none",
    ],
    handle: [
      "absolute top-1/2 left-0.5 flex size-4 -translate-y-1/2 items-center justify-center rounded-full bg-[#79747e] shadow-md",
      "transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-selected/switch:translate-x-7 group-data-selected/switch:bg-[#ffffff]",
      "group-data-disabled/switch:bg-[#1D1B20]/38",
      "group-data-selected/switch:group-data-disabled/switch:bg-[#1D1B20]/38",
      "dark:bg-[#938f99]",
      "dark:group-data-selected/switch:bg-[#381e72]",
      "dark:group-data-disabled/switch:bg-[#E6E0E9]/38",
      "dark:group-data-selected/switch:group-data-disabled/switch:bg-[#E6E0E9]/38",
      "motion-reduce:transition-none",
    ],
    icon: [
      "size-3.5 stroke-[2.5] text-[#6750a4]",
      "dark:text-[#d0bcff]",
      "group-data-disabled/switch:text-[#1D1B20]/38",
      "dark:group-data-disabled/switch:text-[#E6E0E9]/38",
    ],
    label: "min-w-0 text-sm leading-5 text-current",
  },
});

export type MDSwitchVariantProps = VariantProps<typeof mdSwitchStyles>;
type SwitchSlotProps = Parameters<ReturnType<typeof mdSwitchStyles>["root"]>[0];

export function mdSwitchVariants() {
  const styles = mdSwitchStyles();

  return {
    control: (props?: SwitchSlotProps) => styles.control(props),
    handle: (props?: SwitchSlotProps) => styles.handle(props),
    icon: (props?: SwitchSlotProps) => styles.icon(props),
    label: (props?: SwitchSlotProps) => styles.label(props),
    root: (props?: SwitchSlotProps) => styles.root(props),
    track: (props?: SwitchSlotProps) => styles.track(props),
  };
}

export type MDSwitchProps = React.ComponentPropsWithRef<typeof RACSwitch>;

export function MDSwitch({ children, className, ...props }: MDSwitchProps) {
  const { control, handle, icon, label, root, track } = mdSwitchVariants();

  return (
    <RACSwitch
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="switch"
      {...props}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <>
          <span className={control()} data-slot="switch-control">
            <span className={track()} data-slot="switch-track">
              <span className={handle()} data-slot="switch-handle">
                {isSelected ? (
                  <CheckIcon aria-hidden="true" className={icon()} />
                ) : null}
              </span>
            </span>
          </span>
          {children === undefined || children === null ? null : (
            <span className={label()} data-slot="switch-label">
              {children}
            </span>
          )}
        </>
      ))}
    </RACSwitch>
  );
}
