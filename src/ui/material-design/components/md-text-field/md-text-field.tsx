import type * as React from "react";
import {
  ButtonContext,
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  Provider as RACProvider,
  Text as RACText,
  TextArea as RACTextArea,
  TextField as RACTextField,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const mdTextFieldStyles = tv({
  slots: {
    root: [
      "group/text-field grid w-full gap-0 text-[#1d1b20]",
      "data-disabled:text-[#1D1B20]/38",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    container: [
      "relative flex min-h-14 w-full items-center gap-3 overflow-hidden px-4",
      "transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "after:pointer-events-none after:absolute after:inset-0 after:bg-[#1d1b20] after:opacity-0 after:transition-opacity after:duration-200 after:ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-hovered/text-field:after:opacity-[0.04]",
      "group-data-focused/text-field:after:opacity-0",
      "group-data-disabled/text-field:after:opacity-0",
      "dark:after:bg-[#e6e0e9]",
      "motion-reduce:transition-none motion-reduce:after:transition-none",
    ],
    input: [
      "peer relative z-10 w-full min-w-0 flex-1 bg-transparent px-0 text-base leading-6 outline-none select-none",
      "placeholder:text-transparent",
      "disabled:cursor-not-allowed",
    ],
    label: [
      "pointer-events-none absolute z-10 start-4 max-w-[calc(100%-2rem)] truncate text-[#49454f]",
      "transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-focused/text-field:text-[#6750a4]",
      "group-data-invalid/text-field:text-[#b3261e]",
      "group-data-disabled/text-field:text-[#1D1B20]/38",
      "dark:text-[#cac4d0] dark:group-data-focused/text-field:text-[#d0bcff] dark:group-data-invalid/text-field:text-[#f2b8b5] dark:group-data-disabled/text-field:text-[#E6E0E9]/38",
      "motion-reduce:transition-none",
    ],
    leading:
      "relative z-10 flex size-6 shrink-0 items-center justify-center text-[#49454f] group-data-disabled/text-field:text-[#1D1B20]/38 dark:text-[#cac4d0] dark:group-data-disabled/text-field:text-[#E6E0E9]/38 [&_svg]:size-6 [&_svg]:shrink-0",
    trailing:
      "relative z-10 flex size-6 shrink-0 items-center justify-center text-[#49454f] group-data-disabled/text-field:text-[#1D1B20]/38 dark:text-[#cac4d0] dark:group-data-disabled/text-field:text-[#E6E0E9]/38 [&_svg]:size-6 [&_svg]:shrink-0",
    affix:
      "relative z-10 shrink-0 text-base leading-6 text-[#49454f] group-data-disabled/text-field:text-[#1D1B20]/38 dark:text-[#cac4d0] dark:group-data-disabled/text-field:text-[#E6E0E9]/38",
    supporting: "flex min-h-6 justify-between gap-4 px-4 pt-1",
    description: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    error: "text-sm leading-5 text-[#b3261e] dark:text-[#f2b8b5]",
  },
  variants: {
    variant: {
      filled: {
        container: [
          "rounded-t-[4px] border-b-2 bg-[#e7e0ec]",
          "border-[#49454f]",
          "group-data-focused/text-field:border-[#6750a4]",
          "group-data-invalid/text-field:border-[#b3261e]",
          "group-data-disabled/text-field:border-transparent group-data-disabled/text-field:bg-[#1D1B20]/4",
          "dark:bg-[#49454f] dark:border-[#cac4d0]",
          "dark:group-data-focused/text-field:border-[#d0bcff]",
          "dark:group-data-invalid/text-field:border-[#f2b8b5]",
          "dark:group-data-disabled/text-field:bg-[#E6E0E9]/4",
        ],
      },
      outlined: {
        container: [
          "rounded-[4px] border-2 bg-transparent",
          "border-[#79747e]",
          "group-data-hovered/text-field:border-[#1d1b20]",
          "group-data-focused/text-field:border-[#6750a4]",
          "group-data-invalid/text-field:border-[#b3261e]",
          "group-data-disabled/text-field:border-[#1D1B20]/12",
          "dark:border-[#938f99]",
          "dark:group-data-hovered/text-field:border-[#e6e0e9]",
          "dark:group-data-focused/text-field:border-[#d0bcff]",
          "dark:group-data-invalid/text-field:border-[#f2b8b5]",
          "dark:group-data-disabled/text-field:border-[#E6E0E9]/12",
        ],
        label:
          "peer-focus:bg-[#fffbfe] peer-[:not(:placeholder-shown)]:bg-[#fffbfe] dark:peer-focus:bg-[#1d1b20] dark:peer-[:not(:placeholder-shown)]:bg-[#1d1b20]",
      },
    },
    labelPosition: {
      floating: [
        "top-1/2 -translate-y-1/2 text-base leading-6",
        "peer-focus:top-2 peer-focus:translate-y-0 peer-focus:px-1 peer-focus:text-xs peer-focus:leading-4",
        "peer-[:not(:placeholder-shown)]:top-2 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:px-1 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:leading-4",
      ],
      static: "top-2 translate-y-0 text-xs leading-4",
    },
    inputKind: {
      single: "pt-5 pb-1",
      multiline: "min-h-32 resize-y pt-7 pb-3",
    },
    labelOffset: {
      normal: "start-4",
      startContent: "start-13 max-w-[calc(100%-4rem)]",
    },
  },
  defaultVariants: {
    variant: "filled",
    labelPosition: "floating",
    inputKind: "single",
    labelOffset: "normal",
  },
});

export type MDTextFieldVariantProps = VariantProps<typeof mdTextFieldStyles>;
type TextFieldSlotProps = Parameters<
  ReturnType<typeof mdTextFieldStyles>["root"]
>[0];

export function mdTextFieldVariants() {
  const styles = mdTextFieldStyles();

  return {
    affix: (props?: TextFieldSlotProps) => styles.affix(props),
    container: (props?: TextFieldSlotProps) => styles.container(props),
    description: (props?: TextFieldSlotProps) => styles.description(props),
    error: (props?: TextFieldSlotProps) => styles.error(props),
    input: (props?: TextFieldSlotProps) => styles.input(props),
    label: (props?: TextFieldSlotProps) => styles.label(props),
    leading: (props?: TextFieldSlotProps) => styles.leading(props),
    root: (props?: TextFieldSlotProps) => styles.root(props),
    supporting: (props?: TextFieldSlotProps) => styles.supporting(props),
    trailing: (props?: TextFieldSlotProps) => styles.trailing(props),
  };
}

export type MDTextFieldProps = Omit<
  React.ComponentPropsWithRef<typeof RACTextField>,
  "children" | "description" | "errorMessage"
> &
  VariantProps<typeof mdTextFieldStyles> & {
    children?: React.ReactNode;
    description?: React.ReactNode;
    errorMessage?: React.ReactNode;
    label?: string;
    leadingIcon?: React.ReactNode;
    prefix?: React.ReactNode;
    suffix?: React.ReactNode;
    supportingText?: React.ReactNode;
    trailingIcon?: React.ReactNode;
  };

export function MDTextField({
  children,
  className,
  description,
  errorMessage,
  label,
  leadingIcon,
  prefix,
  suffix,
  supportingText,
  trailingIcon,
  variant = "filled",
  ...props
}: MDTextFieldProps) {
  const {
    affix,
    container,
    description: descriptionClassName,
    error,
    input,
    label: labelClassName,
    leading,
    root,
    supporting,
    trailing,
  } = mdTextFieldVariants();
  const startContent = leadingIcon ?? children;
  const resolvedDescription = description ?? supportingText;
  const labelOffset =
    startContent !== undefined || prefix !== undefined
      ? "startContent"
      : "normal";

  return (
    <RACTextField
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="text-field"
      data-variant={variant}
      {...props}
    >
      <div className={container({ variant })} data-slot="text-field-container">
        {startContent === undefined ? null : (
          <span className={leading()} data-slot="text-field-leading">
            <RACProvider values={[[ButtonContext, {}]]}>
              {startContent}
            </RACProvider>
          </span>
        )}
        {prefix === undefined ? null : (
          <span className={affix()} data-slot="text-field-prefix">
            {prefix}
          </span>
        )}
        <RACInput
          className={input({ inputKind: "single" })}
          data-slot="text-field-input"
          placeholder={label ?? " "}
        />
        {label === undefined ? null : (
          <RACLabel
            className={labelClassName({
              labelOffset,
              labelPosition: "floating",
              variant,
            })}
            data-slot="text-field-label"
          >
            {label}
          </RACLabel>
        )}
        {suffix === undefined ? null : (
          <span className={affix()} data-slot="text-field-suffix">
            {suffix}
          </span>
        )}
        {trailingIcon === undefined ? null : (
          <span className={trailing()} data-slot="text-field-trailing">
            <RACProvider values={[[ButtonContext, {}]]}>
              {trailingIcon}
            </RACProvider>
          </span>
        )}
      </div>
      {resolvedDescription === undefined &&
      errorMessage === undefined ? null : (
        <div className={supporting()} data-slot="text-field-supporting">
          {resolvedDescription === undefined ? null : (
            <RACText
              className={descriptionClassName()}
              data-slot="text-field-description"
              slot="description"
            >
              {resolvedDescription}
            </RACText>
          )}
          {errorMessage === undefined ? null : (
            <RACFieldError className={error()} data-slot="text-field-error">
              {errorMessage}
            </RACFieldError>
          )}
        </div>
      )}
    </RACTextField>
  );
}

export type MDTextAreaProps = Omit<
  React.ComponentPropsWithRef<typeof RACTextField>,
  "children" | "description" | "errorMessage"
> &
  VariantProps<typeof mdTextFieldStyles> & {
    children?: React.ReactNode;
    description?: React.ReactNode;
    errorMessage?: React.ReactNode;
    label?: string;
    rows?: number;
    supportingText?: React.ReactNode;
  };

export function MDTextArea({
  className,
  description,
  errorMessage,
  label,
  rows = 4,
  supportingText,
  variant = "filled",
  ...props
}: MDTextAreaProps) {
  const {
    container,
    description: descriptionClassName,
    error,
    input,
    label: labelClassName,
    root,
    supporting,
  } = mdTextFieldVariants();
  const resolvedDescription = description ?? supportingText;

  return (
    <RACTextField
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="text-area"
      data-variant={variant}
      {...props}
    >
      <div className={container({ variant })} data-slot="text-area-container">
        <RACTextArea
          className={input({ inputKind: "multiline" })}
          data-slot="text-area-input"
          placeholder={label ?? " "}
          rows={rows}
        />
        {label === undefined ? null : (
          <RACLabel
            className={labelClassName({
              labelPosition: "static",
              variant,
            })}
            data-slot="text-area-label"
          >
            {label}
          </RACLabel>
        )}
      </div>
      {resolvedDescription === undefined &&
      errorMessage === undefined ? null : (
        <div className={supporting()} data-slot="text-area-supporting">
          {resolvedDescription === undefined ? null : (
            <RACText
              className={descriptionClassName()}
              data-slot="text-area-description"
              slot="description"
            >
              {resolvedDescription}
            </RACText>
          )}
          {errorMessage === undefined ? null : (
            <RACFieldError className={error()} data-slot="text-area-error">
              {errorMessage}
            </RACFieldError>
          )}
        </div>
      )}
    </RACTextField>
  );
}
