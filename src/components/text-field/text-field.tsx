import type * as React from "react";
import {
  FieldError as RACFieldError,
  Input as RACInput,
  Label as RACLabel,
  Text as RACText,
  TextArea as RACTextArea,
  TextField as RACTextField,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const textFieldStyles = tv({
  slots: {
    root: [
      "grid w-full gap-0 text-[#1d1b20]",
      "data-disabled:text-[#1D1B20]/38",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    container: [
      "group/container relative flex w-full items-center",
      "border-b-2 transition-[background-color,border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "after:pointer-events-none after:absolute after:inset-0 after:bg-[#1d1b20] after:opacity-0 after:transition-opacity after:duration-200 after:ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-hovered/container:after:opacity-[0.04]",
      "group-data-focused/container:after:opacity-0",
      "group-data-disabled/container:after:opacity-0",
      "dark:after:bg-[#e6e0e9]",
      "motion-reduce:transition-none motion-reduce:after:transition-none",
    ],
    input: [
      "peer w-full min-w-0 flex-1 bg-transparent px-4 text-base leading-6 outline-none select-none",
      "placeholder:text-transparent",
    ],
    label: [
      "pointer-events-none absolute z-10 start-4 max-w-[calc(100%-2rem)] truncate text-[#49454f]",
      "transition-all duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-disabled/container:text-[#1D1B20]/38",
      "dark:text-[#cac4d0] dark:group-data-disabled/container:text-[#E6E0E9]/38",
      "motion-reduce:transition-none",
    ],
    description:
      "px-4 pt-1 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    error: "px-4 pt-1 text-sm leading-5 text-[#b3261e] dark:text-[#f2b8b5]",
  },
  variants: {
    variant: {
      filled: {
        container: [
          "rounded-t-[4px] rounded-b-[28px] bg-[#e7e0ec]",
          "border-[#cac4d0]",
          "group-data-focused/container:border-[#6750a4]",
          "group-data-invalid/container:border-[#b3261e]",
          "group-data-disabled/container:border-transparent group-data-disabled/container:bg-[#1D1B20]/4",
          "dark:bg-[#49454f] dark:border-[#938f99]",
          "dark:group-data-focused/container:border-[#d0bcff]",
          "dark:group-data-invalid/container:border-[#f2b8b5]",
          "dark:group-data-disabled/container:bg-[#E6E0E9]/4",
        ],
      },
      outlined: {
        container: [
          "rounded-[4px] border-2 bg-transparent",
          "border-[#79747e]",
          "group-data-hovered/container:border-[#1d1b20]",
          "group-data-focused/container:border-[#6750a4]",
          "group-data-invalid/container:border-[#b3261e]",
          "group-data-disabled/container:border-[#1D1B20]/12",
          "dark:border-[#938f99]",
          "dark:group-data-hovered/container:border-[#e6e0e9]",
          "dark:group-data-focused/container:border-[#d0bcff]",
          "dark:group-data-invalid/container:border-[#f2b8b5]",
          "dark:group-data-disabled/container:border-[#E6E0E9]/12",
        ],
      },
    },
    labelPosition: {
      floating: [
        "top-1/2 -translate-y-1/2 text-base leading-6",
        "peer-focus:top-2.5 peer-focus:translate-y-0 peer-focus:text-xs peer-focus:leading-4",
        "peer-[:not(:placeholder-shown)]:top-2.5 peer-[:not(:placeholder-shown)]:translate-y-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:leading-4",
      ],
      static: "top-2.5 translate-y-0 text-xs leading-4",
    },
    inputKind: {
      single: "pt-6 pb-1.5",
      multiline: "pt-8 pb-3",
    },
  },
  defaultVariants: {
    variant: "filled",
    labelPosition: "floating",
    inputKind: "single",
  },
});

export type TextFieldVariantProps = VariantProps<typeof textFieldStyles>;
type TextFieldSlotProps = Parameters<
  ReturnType<typeof textFieldStyles>["root"]
>[0];

export function textFieldVariants() {
  const styles = textFieldStyles();

  return {
    container: (props?: TextFieldSlotProps) => styles.container(props),
    description: (props?: TextFieldSlotProps) => styles.description(props),
    error: (props?: TextFieldSlotProps) => styles.error(props),
    input: (props?: TextFieldSlotProps) => styles.input(props),
    label: (props?: TextFieldSlotProps) => styles.label(props),
    root: (props?: TextFieldSlotProps) => styles.root(props),
  };
}

export type TextFieldProps = Omit<
  React.ComponentPropsWithRef<typeof RACTextField>,
  "children" | "description" | "errorMessage"
> &
  VariantProps<typeof textFieldStyles> & {
    children?: React.ReactNode;
    description?: React.ReactNode;
    errorMessage?: React.ReactNode;
    label?: string;
  };

export function TextField({
  children,
  className,
  description,
  errorMessage,
  label,
  variant = "filled",
  ...props
}: TextFieldProps) {
  const {
    container,
    description: descriptionClassName,
    error,
    input,
    label: labelClassName,
    root,
  } = textFieldVariants();

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
        {children}
        <RACInput
          className={input({ inputKind: "single" })}
          data-slot="text-field-input"
          placeholder={label ?? " "}
        />
        {label === undefined ? null : (
          <RACLabel
            className={labelClassName({ labelPosition: "floating" })}
            data-slot="text-field-label"
          >
            {label}
          </RACLabel>
        )}
      </div>
      {description === undefined ? null : (
        <RACText
          className={descriptionClassName()}
          data-slot="text-field-description"
          slot="description"
        >
          {description}
        </RACText>
      )}
      {errorMessage === undefined ? null : (
        <RACFieldError className={error()} data-slot="text-field-error">
          {errorMessage}
        </RACFieldError>
      )}
    </RACTextField>
  );
}

export type TextAreaProps = Omit<
  React.ComponentPropsWithRef<typeof RACTextField>,
  "children" | "description" | "errorMessage"
> &
  VariantProps<typeof textFieldStyles> & {
    children?: React.ReactNode;
    description?: React.ReactNode;
    errorMessage?: React.ReactNode;
    label?: string;
    rows?: number;
  };

export function TextArea({
  className,
  description,
  errorMessage,
  label,
  rows = 4,
  variant = "filled",
  ...props
}: TextAreaProps) {
  const {
    container,
    description: descriptionClassName,
    error,
    input,
    label: labelClassName,
    root,
  } = textFieldVariants();

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
            className={labelClassName({ labelPosition: "static" })}
            data-slot="text-area-label"
          >
            {label}
          </RACLabel>
        )}
      </div>
      {description === undefined ? null : (
        <RACText
          className={descriptionClassName()}
          data-slot="text-area-description"
          slot="description"
        >
          {description}
        </RACText>
      )}
      {errorMessage === undefined ? null : (
        <RACFieldError className={error()} data-slot="text-area-error">
          {errorMessage}
        </RACFieldError>
      )}
    </RACTextField>
  );
}
