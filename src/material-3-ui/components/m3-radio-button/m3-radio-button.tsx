import type * as React from "react";
import {
  FieldError as RACFieldError,
  Label as RACLabel,
  Radio as RACRadio,
  RadioGroup as RACRadioGroup,
  Text as RACText,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const m3RadioButtonStyles = tv({
  slots: {
    root: [
      "group/radio-button inline-flex min-h-10 w-fit max-w-full cursor-pointer items-start gap-3 rounded-[4px] text-[#1d1b20] outline-none select-none",
      "data-disabled:cursor-not-allowed data-disabled:text-[#1D1B20]/38",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    control: [
      "relative flex size-10 shrink-0 items-center justify-center text-[#49454f]",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-hovered/radio-button:before:opacity-[0.08]",
      "group-data-focus-visible/radio-button:before:opacity-[0.1]",
      "group-data-pressed/radio-button:before:opacity-[0.1]",
      "group-data-selected/radio-button:text-[#6750a4]",
      "group-data-invalid/radio-button:text-[#b3261e]",
      "group-data-disabled/radio-button:text-[#1D1B20]/38 group-data-disabled/radio-button:before:opacity-0",
      "dark:text-[#cac4d0]",
      "dark:group-data-selected/radio-button:text-[#d0bcff]",
      "dark:group-data-invalid/radio-button:text-[#f2b8b5]",
      "dark:group-data-disabled/radio-button:text-[#E6E0E9]/38",
      "motion-reduce:before:transition-none",
    ],
    icon: [
      "relative z-10 flex size-5 items-center justify-center rounded-full border-2 border-current bg-transparent",
      "transition-[border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "motion-reduce:transition-none",
    ],
    dot: [
      "absolute size-2.5 scale-0 rounded-full bg-current transition-transform duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-selected/radio-button:scale-100",
      "motion-reduce:transition-none",
    ],
    label: "min-w-0 pt-2.5 text-sm leading-5 text-current",
  },
});

export type M3RadioButtonVariantProps = VariantProps<
  typeof m3RadioButtonStyles
>;
type RadioButtonSlotProps = Parameters<
  ReturnType<typeof m3RadioButtonStyles>["root"]
>[0];

export function m3RadioButtonVariants() {
  const styles = m3RadioButtonStyles();

  return {
    control: (props?: RadioButtonSlotProps) => styles.control(props),
    dot: (props?: RadioButtonSlotProps) => styles.dot(props),
    icon: (props?: RadioButtonSlotProps) => styles.icon(props),
    label: (props?: RadioButtonSlotProps) => styles.label(props),
    root: (props?: RadioButtonSlotProps) => styles.root(props),
  };
}

export type M3RadioButtonProps = React.ComponentPropsWithRef<typeof RACRadio>;

export function M3RadioButton({
  children,
  className,
  ...props
}: M3RadioButtonProps) {
  const { control, dot, icon, label, root } = m3RadioButtonVariants();

  return (
    <RACRadio
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="radio-button"
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <>
          <span className={control()} data-slot="radio-button-control">
            <span className={icon()} data-slot="radio-button-icon">
              <span className={dot()} data-slot="radio-button-dot" />
            </span>
          </span>
          {children === undefined || children === null ? null : (
            <span className={label()} data-slot="radio-button-label">
              {children}
            </span>
          )}
        </>
      ))}
    </RACRadio>
  );
}

const radioGroupStyles = tv({
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

type RadioGroupSlotProps = Parameters<
  ReturnType<typeof radioGroupStyles>["group"]
>[0];

export function m3RadioGroupVariants() {
  const styles = radioGroupStyles();

  return {
    description: (props?: RadioGroupSlotProps) => styles.description(props),
    error: (props?: RadioGroupSlotProps) => styles.error(props),
    group: (props?: RadioGroupSlotProps) => styles.group(props),
    label: (props?: RadioGroupSlotProps) => styles.label(props),
  };
}

export type M3RadioGroupProps = React.ComponentPropsWithRef<
  typeof RACRadioGroup
>;

export function M3RadioGroup({ className, ...props }: M3RadioGroupProps) {
  const { group } = m3RadioGroupVariants();

  return (
    <RACRadioGroup
      className={composeRenderProps(className, (className) =>
        group({ className }),
      )}
      data-slot="radio-group"
      {...props}
    />
  );
}

export type M3RadioGroupLabelProps = React.ComponentPropsWithRef<
  typeof RACLabel
>;

export function M3RadioGroupLabel({
  className,
  ...props
}: M3RadioGroupLabelProps) {
  const { label } = m3RadioGroupVariants();

  return (
    <RACLabel
      className={label({ className })}
      data-slot="radio-group-label"
      {...props}
    />
  );
}

export type M3RadioGroupDescriptionProps = React.ComponentPropsWithRef<
  typeof RACText
>;

export function M3RadioGroupDescription({
  className,
  slot = "description",
  ...props
}: M3RadioGroupDescriptionProps) {
  const { description } = m3RadioGroupVariants();

  return (
    <RACText
      className={description({ className })}
      data-slot="radio-group-description"
      slot={slot}
      {...props}
    />
  );
}

export type M3RadioGroupErrorProps = React.ComponentPropsWithRef<
  typeof RACFieldError
>;

export function M3RadioGroupError({
  className,
  ...props
}: M3RadioGroupErrorProps) {
  const { error } = m3RadioGroupVariants();

  return (
    <RACFieldError
      className={composeRenderProps(className, (className) =>
        error({ className }),
      )}
      data-slot="radio-group-error"
      {...props}
    />
  );
}
