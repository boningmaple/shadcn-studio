import type * as React from "react";
import { CheckIcon, MinusIcon } from "lucide-react";
import {
  Checkbox as RACCheckbox,
  CheckboxGroup as RACCheckboxGroup,
  FieldError as RACFieldError,
  Label as RACLabel,
  Text as RACText,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const m3CheckboxStyles = tv({
  slots: {
    root: [
      "group/checkbox inline-flex min-h-10 w-fit max-w-full cursor-pointer items-start gap-3 rounded-[4px] text-[#1d1b20] outline-none select-none",
      "data-disabled:cursor-not-allowed data-disabled:text-[#1D1B20]/38",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    control: [
      "relative flex size-10 shrink-0 items-center justify-center text-[#49454f]",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-hovered/checkbox:before:opacity-[0.08]",
      "group-data-focus-visible/checkbox:before:opacity-[0.1]",
      "group-data-pressed/checkbox:before:opacity-[0.1]",
      "group-data-selected/checkbox:text-[#6750a4]",
      "group-data-indeterminate/checkbox:text-[#6750a4]",
      "group-data-invalid/checkbox:text-[#b3261e]",
      "group-data-disabled/checkbox:text-[#1D1B20]/38 group-data-disabled/checkbox:before:opacity-0",
      "dark:text-[#cac4d0]",
      "dark:group-data-selected/checkbox:text-[#d0bcff]",
      "dark:group-data-indeterminate/checkbox:text-[#d0bcff]",
      "dark:group-data-invalid/checkbox:text-[#f2b8b5]",
      "dark:group-data-disabled/checkbox:text-[#E6E0E9]/38",
      "motion-reduce:before:transition-none",
    ],
    indicator: [
      "relative z-10 flex size-[18px] items-center justify-center rounded-[2px] border-2 border-current bg-transparent",
      "transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-selected/checkbox:bg-current",
      "group-data-indeterminate/checkbox:bg-current",
      "motion-reduce:transition-none",
    ],
    icon: [
      "size-4 stroke-[3px] text-white",
      "dark:text-[#381e72]",
      "group-data-invalid/checkbox:text-white",
      "dark:group-data-invalid/checkbox:text-[#601410]",
      "group-data-disabled/checkbox:text-[#fffbfe]",
      "dark:group-data-disabled/checkbox:text-[#1d1b20]",
    ],
    label: "min-w-0 pt-2.5 text-sm leading-5 text-current",
  },
});

export type M3CheckboxVariantProps = VariantProps<typeof m3CheckboxStyles>;
type CheckboxSlotProps = Parameters<
  ReturnType<typeof m3CheckboxStyles>["root"]
>[0];

export function m3CheckboxVariants() {
  const styles = m3CheckboxStyles();

  return {
    control: (props?: CheckboxSlotProps) => styles.control(props),
    icon: (props?: CheckboxSlotProps) => styles.icon(props),
    indicator: (props?: CheckboxSlotProps) => styles.indicator(props),
    label: (props?: CheckboxSlotProps) => styles.label(props),
    root: (props?: CheckboxSlotProps) => styles.root(props),
  };
}

export type M3CheckboxProps = React.ComponentPropsWithRef<typeof RACCheckbox>;

export function M3Checkbox({ children, className, ...props }: M3CheckboxProps) {
  const { control, icon, indicator, label, root } = m3CheckboxVariants();

  return (
    <RACCheckbox
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="checkbox"
      {...props}
    >
      {composeRenderProps(
        children,
        (children, { isIndeterminate, isSelected }) => (
          <>
            <span className={control()} data-slot="checkbox-control">
              <span className={indicator()} data-slot="checkbox-indicator">
                {isIndeterminate ? (
                  <MinusIcon aria-hidden="true" className={icon()} />
                ) : isSelected ? (
                  <CheckIcon aria-hidden="true" className={icon()} />
                ) : null}
              </span>
            </span>
            {children === undefined || children === null ? null : (
              <span className={label()} data-slot="checkbox-label">
                {children}
              </span>
            )}
          </>
        ),
      )}
    </RACCheckbox>
  );
}

const checkboxGroupStyles = tv({
  slots: {
    group: [
      "grid gap-2 text-[#1d1b20]",
      "data-disabled:text-[#1D1B20]/38",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    label: "text-sm leading-5 font-medium text-current",
    description: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    error: "text-sm leading-5 text-[#b3261e] dark:text-[#f2b8b5]",
  },
});

type CheckboxGroupSlotProps = Parameters<
  ReturnType<typeof checkboxGroupStyles>["group"]
>[0];

export function m3CheckboxGroupVariants() {
  const styles = checkboxGroupStyles();

  return {
    description: (props?: CheckboxGroupSlotProps) => styles.description(props),
    error: (props?: CheckboxGroupSlotProps) => styles.error(props),
    group: (props?: CheckboxGroupSlotProps) => styles.group(props),
    label: (props?: CheckboxGroupSlotProps) => styles.label(props),
  };
}

export type M3CheckboxGroupProps = React.ComponentPropsWithRef<
  typeof RACCheckboxGroup
>;

export function M3CheckboxGroup({ className, ...props }: M3CheckboxGroupProps) {
  const { group } = m3CheckboxGroupVariants();

  return (
    <RACCheckboxGroup
      className={composeRenderProps(className, (className) =>
        group({ className }),
      )}
      data-slot="checkbox-group"
      {...props}
    />
  );
}

export type M3CheckboxGroupLabelProps = React.ComponentPropsWithRef<
  typeof RACLabel
>;

export function M3CheckboxGroupLabel({
  className,
  ...props
}: M3CheckboxGroupLabelProps) {
  const { label } = m3CheckboxGroupVariants();

  return (
    <RACLabel
      className={label({ className })}
      data-slot="checkbox-group-label"
      {...props}
    />
  );
}

export type M3CheckboxGroupDescriptionProps = React.ComponentPropsWithRef<
  typeof RACText
>;

export function M3CheckboxGroupDescription({
  className,
  slot = "description",
  ...props
}: M3CheckboxGroupDescriptionProps) {
  const { description } = m3CheckboxGroupVariants();

  return (
    <RACText
      className={description({ className })}
      data-slot="checkbox-group-description"
      slot={slot}
      {...props}
    />
  );
}

export type M3CheckboxGroupErrorProps = React.ComponentPropsWithRef<
  typeof RACFieldError
>;

export function M3CheckboxGroupError({
  className,
  ...props
}: M3CheckboxGroupErrorProps) {
  const { error } = m3CheckboxGroupVariants();

  return (
    <RACFieldError
      className={composeRenderProps(className, (className) =>
        error({ className }),
      )}
      data-slot="checkbox-group-error"
      {...props}
    />
  );
}
