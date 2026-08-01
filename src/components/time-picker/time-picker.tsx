import type * as React from "react";
import {
  DateInput as RACTimeInput,
  DateSegment as RACTimeSegment,
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  FieldError as RACFieldError,
  Label as RACLabel,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  Text as RACText,
  TimeField as RACTimeField,
  composeRenderProps,
  type TimeFieldProps as RACTimeFieldProps,
  type TimeValue,
} from "react-aria-components";
import { ClockIcon } from "lucide-react";
import { tv } from "tailwind-variants";

import { Button } from "@/components/button/button";

export const timePickerStyles = tv({
  slots: {
    root: [
      "grid w-full gap-1 text-[#1d1b20]",
      "data-disabled:text-[#1D1B20]/38",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    label: "px-4 text-sm leading-5 font-medium text-current",
    input: [
      "group/time-input relative flex min-h-14 w-full items-center gap-1 overflow-hidden rounded-[4px] border-2 bg-transparent px-4",
      "border-[#79747e] transition-[border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "after:pointer-events-none after:absolute after:inset-0 after:bg-[#1d1b20] after:opacity-0 after:transition-opacity after:duration-200 after:ease-[cubic-bezier(0.2,0,0,1)]",
      "data-hovered:after:opacity-[0.04] data-focus-within:border-[#6750a4] data-invalid:border-[#b3261e]",
      "data-disabled:border-[#1D1B20]/12 data-disabled:after:opacity-0",
      "dark:border-[#938f99] dark:after:bg-[#e6e0e9] dark:data-focus-within:border-[#d0bcff] dark:data-invalid:border-[#f2b8b5] dark:data-disabled:border-[#E6E0E9]/12",
      "motion-reduce:transition-none motion-reduce:after:transition-none",
    ],
    segment: [
      "relative z-10 inline-flex min-w-[1ch] rounded-[4px] px-0.5 text-base leading-6 outline-none",
      "data-[type=literal]:px-0 data-placeholder:text-[#49454f]",
      "data-focused:bg-[#e8def8] data-focused:text-[#1d192b]",
      "data-invalid:text-[#b3261e] data-disabled:text-[#1D1B20]/38",
      "dark:data-placeholder:text-[#cac4d0] dark:data-focused:bg-[#4a4458] dark:data-focused:text-[#e8def8] dark:data-invalid:text-[#f2b8b5] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    description: "px-4 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    error: "px-4 text-sm leading-5 text-[#b3261e] dark:text-[#f2b8b5]",
    modalOverlay: [
      "fixed inset-0 z-50 grid place-items-center bg-[#000]/32 p-4",
      "data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0",
    ],
    modal: [
      "max-h-[min(28rem,calc(100vh-2rem))] w-full max-w-[26rem] overflow-hidden rounded-[28px]",
      "bg-[#fffbfe] text-[#1d1b20] shadow-[0_8px_12px_6px_rgb(0_0_0/0.15),0_4px_4px_0_rgb(0_0_0/0.3)] outline-none",
      "data-entering:animate-in data-entering:zoom-in-95 data-exiting:animate-out data-exiting:zoom-out-95",
      "dark:bg-[#1d1b20] dark:text-[#e6e0e9]",
    ],
    modalDialog: "grid max-h-[inherit] outline-none",
    modalHeader:
      "grid gap-1 border-b border-[#cac4d0] px-6 pt-5 pb-4 dark:border-[#49454f]",
    modalSupporting:
      "flex items-center gap-2 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    modalTitle:
      "font-heading text-2xl leading-8 font-normal tracking-normal text-current",
    modalContent: "grid gap-4 overflow-y-auto p-6",
    modalActions: "flex justify-end gap-2 px-6 pt-2 pb-6",
  },
});

type TimePickerSlotProps = Parameters<
  ReturnType<typeof timePickerStyles>["root"]
>[0];

export function timePickerVariants() {
  const styles = timePickerStyles();

  return {
    description: (props?: TimePickerSlotProps) => styles.description(props),
    error: (props?: TimePickerSlotProps) => styles.error(props),
    input: (props?: TimePickerSlotProps) => styles.input(props),
    label: (props?: TimePickerSlotProps) => styles.label(props),
    modal: (props?: TimePickerSlotProps) => styles.modal(props),
    modalActions: (props?: TimePickerSlotProps) => styles.modalActions(props),
    modalContent: (props?: TimePickerSlotProps) => styles.modalContent(props),
    modalDialog: (props?: TimePickerSlotProps) => styles.modalDialog(props),
    modalHeader: (props?: TimePickerSlotProps) => styles.modalHeader(props),
    modalOverlay: (props?: TimePickerSlotProps) => styles.modalOverlay(props),
    modalSupporting: (props?: TimePickerSlotProps) =>
      styles.modalSupporting(props),
    modalTitle: (props?: TimePickerSlotProps) => styles.modalTitle(props),
    root: (props?: TimePickerSlotProps) => styles.root(props),
    segment: (props?: TimePickerSlotProps) => styles.segment(props),
  };
}

export type TimePickerInputProps<T extends TimeValue = TimeValue> = Omit<
  RACTimeFieldProps<T>,
  "children" | "className"
> & {
  className?: RACTimeFieldProps<T>["className"];
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  label?: React.ReactNode;
};

export function TimePickerInput<T extends TimeValue = TimeValue>({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  description,
  errorMessage,
  label,
  ...props
}: TimePickerInputProps<T>) {
  const {
    description: descriptionClassName,
    error,
    input,
    label: labelClassName,
    root,
    segment,
  } = timePickerVariants();

  return (
    <RACTimeField
      aria-label={
        ariaLabel ??
        (ariaLabelledBy === undefined && label === undefined
          ? "Select time"
          : undefined)
      }
      aria-labelledby={ariaLabelledBy}
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="time-picker-input"
      {...props}
    >
      {label === undefined ? null : (
        <RACLabel className={labelClassName()} data-slot="time-picker-label">
          {label}
        </RACLabel>
      )}
      <RACTimeInput className={input()} data-slot="time-picker-field">
        {(segmentValue) => (
          <RACTimeSegment className={segment()} segment={segmentValue} />
        )}
      </RACTimeInput>
      {description === undefined ? null : (
        <RACText
          className={descriptionClassName()}
          data-slot="time-picker-description"
          slot="description"
        >
          {description}
        </RACText>
      )}
      {errorMessage === undefined ? null : (
        <RACFieldError className={error()} data-slot="time-picker-error">
          {errorMessage}
        </RACFieldError>
      )}
    </RACTimeField>
  );
}

export type ModalTimePickerInputProps<T extends TimeValue = TimeValue> =
  TimePickerInputProps<T> & {
    supportingText?: React.ReactNode;
    title?: React.ReactNode;
    triggerLabel?: React.ReactNode;
  };

export function ModalTimePickerInput<T extends TimeValue = TimeValue>({
  supportingText = "Input time picker",
  title = "Enter time",
  triggerLabel = "Open time input",
  ...props
}: ModalTimePickerInputProps<T>) {
  const {
    modal,
    modalActions,
    modalContent,
    modalDialog,
    modalHeader,
    modalOverlay,
    modalSupporting,
    modalTitle,
  } = timePickerVariants();

  return (
    <RACDialogTrigger>
      <Button variant="tonal">{triggerLabel}</Button>
      <RACModalOverlay className={modalOverlay()} isDismissable>
        <RACModal className={modal()} data-slot="modal-time-picker-modal">
          <RACDialog
            aria-label={typeof title === "string" ? title : "Enter time"}
            className={modalDialog()}
            data-slot="modal-time-picker"
          >
            <div className={modalHeader()} data-slot="modal-time-picker-header">
              <span className={modalSupporting()}>
                <ClockIcon aria-hidden="true" className="size-4" />
                {supportingText}
              </span>
              <h2 className={modalTitle()}>{title}</h2>
            </div>
            <div
              className={modalContent()}
              data-slot="modal-time-picker-content"
            >
              <TimePickerInput {...props} />
            </div>
            <div
              className={modalActions()}
              data-slot="modal-time-picker-actions"
            >
              <Button slot="close" variant="text">
                Cancel
              </Button>
              <Button slot="close" variant="text">
                OK
              </Button>
            </div>
          </RACDialog>
        </RACModal>
      </RACModalOverlay>
    </RACDialogTrigger>
  );
}
