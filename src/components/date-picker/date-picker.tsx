import type * as React from "react";
import {
  Calendar as RACCalendar,
  CalendarCell as RACCalendarCell,
  CalendarGrid as RACCalendarGrid,
  CalendarGridBody as RACCalendarGridBody,
  CalendarGridHeader as RACCalendarGridHeader,
  CalendarHeaderCell as RACCalendarHeaderCell,
  CalendarHeading as RACCalendarHeading,
  DateField as RACDateField,
  DateInput as RACDateInput,
  DatePicker as RACDatePicker,
  DateRangePicker as RACDateRangePicker,
  DateSegment as RACDateSegment,
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  FieldError as RACFieldError,
  Group as RACGroup,
  Label as RACLabel,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  Popover as RACPopover,
  RangeCalendar as RACRangeCalendar,
  Text as RACText,
  composeRenderProps,
  type CalendarProps as RACCalendarProps,
  type DateFieldProps as RACDateFieldProps,
  type DatePickerProps as RACDatePickerProps,
  type DateRangePickerProps as RACDateRangePickerProps,
  type DateValue,
} from "react-aria-components";
import {
  CalendarDaysIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

import { Button } from "@/components/button/button";
import { IconButton } from "@/components/icon-button/icon-button";

export const datePickerStyles = tv({
  slots: {
    root: [
      "grid w-full gap-1 text-[#1d1b20]",
      "data-disabled:text-[#1D1B20]/38",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    label: "px-4 text-sm leading-5 font-medium text-current",
    fieldContainer: [
      "group/date-field relative flex min-h-14 w-full items-center gap-1 overflow-hidden rounded-[4px] border-2 bg-transparent px-3",
      "border-[#79747e] transition-[border-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "after:pointer-events-none after:absolute after:inset-0 after:bg-[#1d1b20] after:opacity-0 after:transition-opacity after:duration-200 after:ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-hovered/date-field:after:opacity-[0.04] group-data-focus-within/date-field:border-[#6750a4] group-data-invalid/date-field:border-[#b3261e]",
      "group-data-disabled/date-field:border-[#1D1B20]/12 group-data-disabled/date-field:after:opacity-0",
      "dark:border-[#938f99] dark:after:bg-[#e6e0e9] dark:group-data-focus-within/date-field:border-[#d0bcff] dark:group-data-invalid/date-field:border-[#f2b8b5] dark:group-data-disabled/date-field:border-[#E6E0E9]/12",
      "motion-reduce:transition-none motion-reduce:after:transition-none",
    ],
    input:
      "relative z-10 flex min-w-0 flex-1 items-center py-3 text-base leading-6",
    segment: [
      "inline-flex min-w-[1ch] rounded-[4px] px-0.5 text-base leading-6 outline-none",
      "data-[type=literal]:px-0 data-placeholder:text-[#49454f]",
      "data-focused:bg-[#e8def8] data-focused:text-[#1d192b]",
      "data-invalid:text-[#b3261e] data-disabled:text-[#1D1B20]/38",
      "dark:data-placeholder:text-[#cac4d0] dark:data-focused:bg-[#4a4458] dark:data-focused:text-[#e8def8] dark:data-invalid:text-[#f2b8b5] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    description: "px-4 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    error: "px-4 text-sm leading-5 text-[#b3261e] dark:text-[#f2b8b5]",
    rangeFields: "grid gap-3 sm:grid-cols-[1fr_auto_1fr_auto] sm:items-center",
    rangeField:
      "group/date-field relative grid min-h-14 overflow-hidden rounded-[4px] border-2 border-[#79747e] px-3 pt-2 pb-1 dark:border-[#938f99]",
    rangeFieldLabel:
      "relative z-10 text-xs leading-4 text-[#49454f] dark:text-[#cac4d0]",
    rangeSeparator:
      "hidden text-sm leading-5 text-[#49454f] dark:text-[#cac4d0] sm:block",
    popover: [
      "z-50 overflow-hidden rounded-[28px] bg-[#fffbfe] text-[#1d1b20]",
      "shadow-[0_8px_12px_6px_rgb(0_0_0/0.15),0_4px_4px_0_rgb(0_0_0/0.3)]",
      "outline-none data-entering:animate-in data-entering:fade-in-0 data-entering:zoom-in-95 data-exiting:animate-out data-exiting:fade-out-0 data-exiting:zoom-out-95",
      "dark:bg-[#1d1b20] dark:text-[#e6e0e9]",
    ],
    popoverDialog: "outline-none",
    calendar: "grid gap-3 p-4",
    calendarHeader: "flex h-10 items-center justify-between gap-2",
    calendarHeading:
      "font-heading flex-1 text-center text-base leading-6 font-medium tracking-normal",
    months: "grid gap-4",
    calendarGrid: "w-full table-fixed border-separate border-spacing-y-1",
    headerCell:
      "h-8 text-center text-xs leading-4 font-medium text-[#49454f] dark:text-[#cac4d0]",
    cell: [
      "mx-auto flex size-10 items-center justify-center rounded-full text-sm leading-5 outline-none",
      "text-[#1d1b20] transition-[background-color,color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "data-hovered:bg-[#1d1b20]/8 data-pressed:bg-[#1d1b20]/10",
      "data-today:font-bold data-today:text-[#6750a4]",
      "data-selected:bg-[#e8def8] data-selected:text-[#1d192b]",
      "data-selection-start:bg-[#6750a4] data-selection-start:text-white",
      "data-selection-end:bg-[#6750a4] data-selection-end:text-white",
      "data-disabled:text-[#1D1B20]/38 data-disabled:data-selected:bg-[#1D1B20]/10",
      "data-outside-month:text-[#1D1B20]/38",
      "data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-[#6750a4]",
      "dark:text-[#e6e0e9] dark:data-hovered:bg-[#e6e0e9]/8 dark:data-pressed:bg-[#e6e0e9]/10",
      "dark:data-today:text-[#d0bcff] dark:data-selected:bg-[#4a4458] dark:data-selected:text-[#e8def8]",
      "dark:data-selection-start:bg-[#d0bcff] dark:data-selection-start:text-[#381e72] dark:data-selection-end:bg-[#d0bcff] dark:data-selection-end:text-[#381e72]",
      "dark:data-disabled:text-[#E6E0E9]/38 dark:data-disabled:data-selected:bg-[#E6E0E9]/10 dark:data-outside-month:text-[#E6E0E9]/38 dark:data-focus-visible:outline-[#d0bcff]",
      "motion-reduce:transition-none",
    ],
    modalOverlay: [
      "fixed inset-0 z-50 grid place-items-center bg-[#000]/32 p-4",
      "data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0",
    ],
    modal: [
      "max-h-[min(40rem,calc(100vh-2rem))] w-full max-w-[28rem] overflow-hidden rounded-[28px]",
      "bg-[#fffbfe] text-[#1d1b20] shadow-[0_8px_12px_6px_rgb(0_0_0/0.15),0_4px_4px_0_rgb(0_0_0/0.3)] outline-none",
      "data-entering:animate-in data-entering:zoom-in-95 data-exiting:animate-out data-exiting:zoom-out-95",
      "dark:bg-[#1d1b20] dark:text-[#e6e0e9]",
    ],
    modalDialog: "grid max-h-[inherit] outline-none",
    modalHeader:
      "grid gap-1 border-b border-[#cac4d0] px-6 pt-5 pb-4 dark:border-[#49454f]",
    modalSupporting: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    modalTitle:
      "font-heading text-2xl leading-8 font-normal tracking-normal text-current",
    modalContent: "overflow-y-auto",
    modalInputContent: "grid gap-4 overflow-y-auto p-6",
    modalActions: "flex justify-end gap-2 px-6 pt-2 pb-6",
  },
  variants: {
    months: {
      one: {
        months: "grid-cols-1",
      },
      two: {
        months: "grid-cols-1 sm:grid-cols-2",
        modal: "max-w-[42rem]",
      },
    },
  },
  defaultVariants: {
    months: "one",
  },
});

type DatePickerSlotProps = Parameters<
  ReturnType<typeof datePickerStyles>["root"]
>[0];

export function datePickerVariants() {
  const styles = datePickerStyles();

  return {
    calendar: (props?: DatePickerSlotProps) => styles.calendar(props),
    calendarGrid: (props?: DatePickerSlotProps) => styles.calendarGrid(props),
    calendarHeader: (props?: DatePickerSlotProps) =>
      styles.calendarHeader(props),
    calendarHeading: (props?: DatePickerSlotProps) =>
      styles.calendarHeading(props),
    cell: (props?: DatePickerSlotProps) => styles.cell(props),
    description: (props?: DatePickerSlotProps) => styles.description(props),
    error: (props?: DatePickerSlotProps) => styles.error(props),
    fieldContainer: (props?: DatePickerSlotProps) =>
      styles.fieldContainer(props),
    headerCell: (props?: DatePickerSlotProps) => styles.headerCell(props),
    input: (props?: DatePickerSlotProps) => styles.input(props),
    label: (props?: DatePickerSlotProps) => styles.label(props),
    modal: (props?: DatePickerSlotProps) => styles.modal(props),
    modalActions: (props?: DatePickerSlotProps) => styles.modalActions(props),
    modalContent: (props?: DatePickerSlotProps) => styles.modalContent(props),
    modalDialog: (props?: DatePickerSlotProps) => styles.modalDialog(props),
    modalHeader: (props?: DatePickerSlotProps) => styles.modalHeader(props),
    modalInputContent: (props?: DatePickerSlotProps) =>
      styles.modalInputContent(props),
    modalOverlay: (props?: DatePickerSlotProps) => styles.modalOverlay(props),
    modalSupporting: (props?: DatePickerSlotProps) =>
      styles.modalSupporting(props),
    modalTitle: (props?: DatePickerSlotProps) => styles.modalTitle(props),
    months: (props?: DatePickerSlotProps) => styles.months(props),
    popover: (props?: DatePickerSlotProps) => styles.popover(props),
    popoverDialog: (props?: DatePickerSlotProps) => styles.popoverDialog(props),
    rangeField: (props?: DatePickerSlotProps) => styles.rangeField(props),
    rangeFieldLabel: (props?: DatePickerSlotProps) =>
      styles.rangeFieldLabel(props),
    rangeFields: (props?: DatePickerSlotProps) => styles.rangeFields(props),
    rangeSeparator: (props?: DatePickerSlotProps) =>
      styles.rangeSeparator(props),
    root: (props?: DatePickerSlotProps) => styles.root(props),
    segment: (props?: DatePickerSlotProps) => styles.segment(props),
  };
}

type DatePickerStyleProps = VariantProps<typeof datePickerStyles>;
type VisibleMonths = "one" | "two";

export type DatePickerProps<T extends DateValue = DateValue> = Omit<
  RACDatePickerProps<T>,
  "children" | "className"
> & {
  className?: RACDatePickerProps<T>["className"];
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  label?: React.ReactNode;
  visibleMonths?: VisibleMonths;
};

export function DatePicker<T extends DateValue = DateValue>({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  description,
  errorMessage,
  label,
  visibleMonths = "one",
  ...props
}: DatePickerProps<T>) {
  const {
    description: descriptionClassName,
    error,
    fieldContainer,
    label: labelClassName,
    popover,
    popoverDialog,
    root,
  } = datePickerVariants();

  return (
    <RACDatePicker
      aria-label={
        ariaLabel ??
        (ariaLabelledBy === undefined && label === undefined
          ? "Select date"
          : undefined)
      }
      aria-labelledby={ariaLabelledBy}
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="date-picker"
      {...props}
    >
      {label === undefined ? null : (
        <RACLabel className={labelClassName()} data-slot="date-picker-label">
          {label}
        </RACLabel>
      )}
      <RACGroup
        className={fieldContainer()}
        data-slot="date-picker-field-container"
      >
        <DatePickerInput />
        <IconButton aria-label="Open calendar" size="xs" variant="standard">
          <CalendarDaysIcon />
        </IconButton>
      </RACGroup>
      {description === undefined ? null : (
        <RACText
          className={descriptionClassName()}
          data-slot="date-picker-description"
          slot="description"
        >
          {description}
        </RACText>
      )}
      {errorMessage === undefined ? null : (
        <RACFieldError className={error()} data-slot="date-picker-error">
          {errorMessage}
        </RACFieldError>
      )}
      <RACPopover
        className={popover({ months: visibleMonths })}
        data-slot="date-picker-popover"
        offset={8}
      >
        <RACDialog className={popoverDialog()} data-slot="date-picker-dialog">
          <CalendarSurface visibleMonths={visibleMonths} />
        </RACDialog>
      </RACPopover>
    </RACDatePicker>
  );
}

export type DateRangePickerProps<T extends DateValue = DateValue> = Omit<
  RACDateRangePickerProps<T>,
  "children" | "className"
> & {
  className?: RACDateRangePickerProps<T>["className"];
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  label?: React.ReactNode;
  visibleMonths?: VisibleMonths;
};

export function DateRangePicker<T extends DateValue = DateValue>({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  description,
  errorMessage,
  label,
  visibleMonths = "two",
  ...props
}: DateRangePickerProps<T>) {
  const {
    description: descriptionClassName,
    error,
    label: labelClassName,
    popover,
    popoverDialog,
    rangeField,
    rangeFieldLabel,
    rangeFields,
    rangeSeparator,
    root,
  } = datePickerVariants();

  return (
    <RACDateRangePicker
      aria-label={
        ariaLabel ??
        (ariaLabelledBy === undefined && label === undefined
          ? "Select date range"
          : undefined)
      }
      aria-labelledby={ariaLabelledBy}
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="date-range-picker"
      {...props}
    >
      {label === undefined ? null : (
        <RACLabel
          className={labelClassName()}
          data-slot="date-range-picker-label"
        >
          {label}
        </RACLabel>
      )}
      <RACGroup className={rangeFields()} data-slot="date-range-picker-fields">
        <div className={rangeField()} data-slot="date-range-picker-start">
          <span className={rangeFieldLabel()}>Start date</span>
          <DatePickerInput slot="start" />
        </div>
        <span className={rangeSeparator()} aria-hidden="true">
          -
        </span>
        <div className={rangeField()} data-slot="date-range-picker-end">
          <span className={rangeFieldLabel()}>End date</span>
          <DatePickerInput slot="end" />
        </div>
        <IconButton
          aria-label="Open calendar"
          className="justify-self-start"
          size="xs"
          variant="standard"
        >
          <CalendarDaysIcon />
        </IconButton>
      </RACGroup>
      {description === undefined ? null : (
        <RACText
          className={descriptionClassName()}
          data-slot="date-range-picker-description"
          slot="description"
        >
          {description}
        </RACText>
      )}
      {errorMessage === undefined ? null : (
        <RACFieldError className={error()} data-slot="date-range-picker-error">
          {errorMessage}
        </RACFieldError>
      )}
      <RACPopover
        className={popover({ months: visibleMonths })}
        data-slot="date-range-picker-popover"
        offset={8}
      >
        <RACDialog
          className={popoverDialog()}
          data-slot="date-range-picker-dialog"
        >
          <RangeCalendarSurface visibleMonths={visibleMonths} />
        </RACDialog>
      </RACPopover>
    </RACDateRangePicker>
  );
}

export type ModalDatePickerProps<T extends DateValue = DateValue> = Omit<
  RACCalendarProps<T>,
  "children" | "className"
> &
  Pick<DatePickerStyleProps, "months"> & {
    className?: string;
    supportingText?: React.ReactNode;
    title?: React.ReactNode;
    triggerLabel?: React.ReactNode;
  };

export function ModalDatePicker<T extends DateValue = DateValue>({
  className,
  months: visibleMonths = "one",
  supportingText = "Select date",
  title = "Select date",
  triggerLabel = "Open date picker",
  ...props
}: ModalDatePickerProps<T>) {
  const {
    modal,
    modalActions,
    modalContent,
    modalDialog,
    modalHeader,
    modalOverlay,
    modalSupporting,
    modalTitle,
  } = datePickerVariants();

  return (
    <RACDialogTrigger>
      <Button className={className} variant="tonal">
        {triggerLabel}
      </Button>
      <RACModalOverlay className={modalOverlay()} isDismissable>
        <RACModal
          className={modal({ months: visibleMonths })}
          data-slot="modal-date-picker-modal"
        >
          <RACDialog
            aria-label={typeof title === "string" ? title : "Select date"}
            className={modalDialog()}
            data-slot="modal-date-picker"
          >
            <div className={modalHeader()} data-slot="modal-date-picker-header">
              <span className={modalSupporting()}>{supportingText}</span>
              <h2 className={modalTitle()}>{title}</h2>
            </div>
            <div
              className={modalContent()}
              data-slot="modal-date-picker-content"
            >
              <RACCalendar
                className={undefined}
                visibleDuration={{ months: visibleMonths === "two" ? 2 : 1 }}
                {...props}
              >
                <CalendarContent visibleMonths={visibleMonths} />
              </RACCalendar>
            </div>
            <div
              className={modalActions()}
              data-slot="modal-date-picker-actions"
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

export type ModalDateInputProps<T extends DateValue = DateValue> = Omit<
  RACDateFieldProps<T>,
  "children" | "className"
> & {
  className?: string;
  description?: React.ReactNode;
  errorMessage?: React.ReactNode;
  label?: React.ReactNode;
  supportingText?: React.ReactNode;
  title?: React.ReactNode;
  triggerLabel?: React.ReactNode;
};

export function ModalDateInput<T extends DateValue = DateValue>({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  className,
  description,
  errorMessage,
  label = "Date",
  supportingText = "Type a date",
  title = "Enter date",
  triggerLabel = "Open date input",
  ...props
}: ModalDateInputProps<T>) {
  const {
    description: descriptionClassName,
    error,
    fieldContainer,
    label: labelClassName,
    modal,
    modalActions,
    modalDialog,
    modalHeader,
    modalInputContent,
    modalOverlay,
    modalSupporting,
    modalTitle,
    root,
  } = datePickerVariants();

  return (
    <RACDialogTrigger>
      <Button className={className} variant="outlined">
        {triggerLabel}
      </Button>
      <RACModalOverlay className={modalOverlay()} isDismissable>
        <RACModal className={modal()} data-slot="modal-date-input-modal">
          <RACDialog
            aria-label={typeof title === "string" ? title : "Enter date"}
            className={modalDialog()}
            data-slot="modal-date-input"
          >
            <div className={modalHeader()} data-slot="modal-date-input-header">
              <span className={modalSupporting()}>{supportingText}</span>
              <h2 className={modalTitle()}>{title}</h2>
            </div>
            <div
              className={modalInputContent()}
              data-slot="modal-date-input-content"
            >
              <RACDateField
                aria-label={
                  ariaLabel ??
                  (ariaLabelledBy === undefined && label === undefined
                    ? "Date"
                    : undefined)
                }
                aria-labelledby={ariaLabelledBy}
                className={root()}
                {...props}
              >
                {label === undefined ? null : (
                  <RACLabel className={labelClassName()}>{label}</RACLabel>
                )}
                <RACGroup className={fieldContainer()}>
                  <DatePickerInput />
                </RACGroup>
                {description === undefined ? null : (
                  <RACText
                    className={descriptionClassName()}
                    slot="description"
                  >
                    {description}
                  </RACText>
                )}
                {errorMessage === undefined ? null : (
                  <RACFieldError className={error()}>
                    {errorMessage}
                  </RACFieldError>
                )}
              </RACDateField>
            </div>
            <div
              className={modalActions()}
              data-slot="modal-date-input-actions"
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

function DatePickerInput({ slot }: { slot?: string }) {
  const { input, segment } = datePickerVariants();

  return (
    <RACDateInput className={input()} data-slot="date-picker-input" slot={slot}>
      {(segmentValue) => (
        <RACDateSegment className={segment()} segment={segmentValue} />
      )}
    </RACDateInput>
  );
}

function CalendarSurface({ visibleMonths }: { visibleMonths: VisibleMonths }) {
  return (
    <RACCalendar
      className={undefined}
      visibleDuration={{ months: visibleMonths === "two" ? 2 : 1 }}
    >
      <CalendarContent visibleMonths={visibleMonths} />
    </RACCalendar>
  );
}

function RangeCalendarSurface({
  visibleMonths,
}: {
  visibleMonths: VisibleMonths;
}) {
  return (
    <RACRangeCalendar
      className={undefined}
      visibleDuration={{ months: visibleMonths === "two" ? 2 : 1 }}
    >
      <CalendarContent visibleMonths={visibleMonths} />
    </RACRangeCalendar>
  );
}

function CalendarContent({ visibleMonths }: { visibleMonths: VisibleMonths }) {
  const {
    calendar,
    calendarGrid,
    calendarHeader,
    calendarHeading,
    cell,
    headerCell,
    months,
  } = datePickerVariants();
  const monthCount = visibleMonths === "two" ? 2 : 1;

  return (
    <div className={calendar()} data-slot="date-picker-calendar">
      <div className={calendarHeader()} data-slot="date-picker-calendar-header">
        <IconButton
          aria-label="Previous month"
          size="xs"
          slot="previous"
          variant="standard"
        >
          <ChevronLeftIcon />
        </IconButton>
        <RACCalendarHeading
          className={calendarHeading()}
          data-slot="date-picker-calendar-heading"
        />
        <IconButton
          aria-label="Next month"
          size="xs"
          slot="next"
          variant="standard"
        >
          <ChevronRightIcon />
        </IconButton>
      </div>
      <div className={months({ months: visibleMonths })}>
        {Array.from({ length: monthCount }, (_, index) => (
          <RACCalendarGrid
            className={calendarGrid()}
            key={index}
            offset={{ months: index }}
            weekdayStyle="short"
          >
            <RACCalendarGridHeader>
              {(day) => (
                <RACCalendarHeaderCell className={headerCell()}>
                  {day}
                </RACCalendarHeaderCell>
              )}
            </RACCalendarGridHeader>
            <RACCalendarGridBody>
              {(date) => <RACCalendarCell className={cell()} date={date} />}
            </RACCalendarGridBody>
          </RACCalendarGrid>
        ))}
      </div>
    </div>
  );
}
