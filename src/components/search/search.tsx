import * as React from "react";
import {
  Autocomplete as RACAutocomplete,
  Button as RACButton,
  ButtonContext,
  Dialog as RACDialog,
  DialogTrigger as RACDialogTrigger,
  Input as RACInput,
  ListBox as RACListBox,
  ListBoxItem as RACListBoxItem,
  Modal as RACModal,
  ModalOverlay as RACModalOverlay,
  Provider as RACProvider,
  SearchField as RACSearchField,
  Text as RACText,
  composeRenderProps,
  type AutocompleteProps as RACAutocompleteProps,
  type ListBoxItemRenderProps,
  type ListBoxItemProps as RACListBoxItemProps,
  type ListBoxProps as RACListBoxProps,
  type SearchFieldProps as RACSearchFieldProps,
} from "react-aria-components";
import { ArrowLeftIcon, SearchIcon, XIcon } from "lucide-react";
import { tv, type VariantProps } from "tailwind-variants";

import { IconButton } from "@/components/icon-button/icon-button";

export const searchStyles = tv({
  slots: {
    barRoot: [
      "group/search-bar grid w-full text-[#1d1b20]",
      "data-disabled:text-[#1D1B20]/38",
      "dark:text-[#e6e0e9] dark:data-disabled:text-[#E6E0E9]/38",
    ],
    barContainer: [
      "relative flex w-full items-center gap-1 overflow-hidden",
      "transition-[background-color,box-shadow] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-hovered/search-bar:before:opacity-[0.08] group-data-focused/search-bar:before:opacity-[0.1]",
      "group-data-disabled/search-bar:before:opacity-0",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
    ],
    barLeading:
      "relative z-10 flex size-12 shrink-0 items-center justify-center text-[#49454f] dark:text-[#cac4d0] [&_svg]:size-6 [&_svg]:shrink-0",
    barInput: [
      "relative z-10 h-full min-w-0 flex-1 bg-transparent px-1 text-base leading-6 outline-none",
      "placeholder:text-[#49454f] disabled:cursor-not-allowed dark:placeholder:text-[#cac4d0]",
    ],
    barClear:
      "relative z-10 group-data-empty/search-bar:hidden group-data-disabled/search-bar:hidden",
    barTrailing:
      "relative z-10 flex size-12 shrink-0 items-center justify-center text-[#49454f] dark:text-[#cac4d0] [&_svg]:size-6 [&_svg]:shrink-0",
    trigger: [
      "group/search-trigger relative flex h-14 w-full max-w-xl items-center gap-4 overflow-hidden rounded-full px-4 text-left outline-0 outline-solid outline-offset-0 outline-transparent select-none",
      "bg-[#ece6f0] text-[#49454f] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
      "transition-[background-color,box-shadow,outline-offset,outline-width] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "data-hovered:before:opacity-[0.08] data-pressed:before:opacity-[0.1]",
      "data-focus-visible:outline-2 data-focus-visible:outline-offset-2 data-focus-visible:outline-[#6750a4]",
      "dark:bg-[#2b2930] dark:text-[#cac4d0] dark:data-focus-visible:outline-[#d0bcff]",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
    ],
    triggerIcon: "relative z-10 size-6 shrink-0",
    triggerLabel:
      "relative z-10 min-w-0 flex-1 truncate text-base leading-6 font-normal",
    viewOverlay: [
      "fixed inset-0 z-50 bg-[#000]/32",
      "data-entering:animate-in data-entering:fade-in-0 data-exiting:animate-out data-exiting:fade-out-0",
    ],
    viewModal: [
      "overflow-hidden bg-[#fffbfe] text-[#1d1b20] outline-none",
      "shadow-[0_8px_12px_6px_rgb(0_0_0/0.15),0_4px_4px_0_rgb(0_0_0/0.3)]",
      "data-entering:animate-in data-entering:zoom-in-95 data-exiting:animate-out data-exiting:zoom-out-95",
      "dark:bg-[#1d1b20] dark:text-[#e6e0e9]",
    ],
    viewDialog: "grid max-h-[inherit] grid-rows-[auto_1fr] outline-none",
    results:
      "grid max-h-full gap-0 overflow-y-auto bg-[#fffbfe] py-2 outline-none dark:bg-[#1d1b20]",
    empty:
      "px-6 py-8 text-center text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    resultItem: [
      "group/search-result relative isolate grid cursor-pointer grid-cols-[40px_minmax(0,1fr)_auto] items-center gap-x-4 overflow-hidden px-4 outline-none select-none",
      "text-[#1d1b20] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "data-hovered:before:opacity-[0.08] data-focus-visible:before:opacity-[0.1] data-pressed:before:opacity-[0.1]",
      "data-selected:bg-[#e8def8]",
      "data-disabled:cursor-not-allowed data-disabled:text-[#1D1B20]/38 data-disabled:before:opacity-0",
      "dark:text-[#e6e0e9] dark:data-selected:bg-[#4a4458] dark:data-disabled:text-[#E6E0E9]/38",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
    ],
    resultStart:
      "relative z-10 flex size-10 items-center justify-center self-center text-[#49454f] group-data-selected/search-result:text-[#6750a4] group-data-disabled/search-result:text-[#1D1B20]/38 dark:text-[#cac4d0] dark:group-data-selected/search-result:text-[#d0bcff] dark:group-data-disabled/search-result:text-[#E6E0E9]/38 [&_svg]:size-6 [&_svg]:shrink-0",
    resultContent: "relative z-10 grid min-w-0 gap-0.5",
    resultHeadline: "truncate text-base leading-6 font-normal text-current",
    resultSupportingText:
      "line-clamp-2 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    resultEnd:
      "relative z-10 flex min-h-10 min-w-10 items-center justify-end text-[#49454f] group-data-selected/search-result:text-[#6750a4] group-data-disabled/search-result:text-[#1D1B20]/38 dark:text-[#cac4d0] dark:group-data-selected/search-result:text-[#d0bcff] dark:group-data-disabled/search-result:text-[#E6E0E9]/38 [&_svg]:size-6 [&_svg]:shrink-0",
  },
  variants: {
    barVariant: {
      bar: {
        barContainer: [
          "h-14 rounded-full bg-[#ece6f0] px-1",
          "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
          "dark:bg-[#2b2930]",
        ],
      },
      view: {
        barContainer: [
          "h-16 rounded-none border-b border-[#cac4d0] bg-[#fffbfe] px-2 shadow-none",
          "dark:border-[#49454f] dark:bg-[#1d1b20]",
        ],
      },
    },
    itemLines: {
      one: {
        resultItem: "min-h-14 py-1",
      },
      two: {
        resultItem: "min-h-18 py-2",
      },
    },
    placement: {
      docked: {
        viewOverlay: "grid place-items-start px-4 py-12 sm:px-6 sm:py-16",
        viewModal:
          "mx-auto max-h-[min(36rem,calc(100vh-6rem))] w-full max-w-xl rounded-[28px]",
      },
      fullscreen: {
        viewOverlay: "grid place-items-stretch p-0",
        viewModal: "h-full w-full rounded-none shadow-none",
      },
    },
  },
  defaultVariants: {
    barVariant: "bar",
    itemLines: "one",
    placement: "docked",
  },
});

type SearchSlotProps = Parameters<
  ReturnType<typeof searchStyles>["barRoot"]
>[0];

export function searchVariants() {
  const styles = searchStyles();

  return {
    barClear: (props?: SearchSlotProps) => styles.barClear(props),
    barContainer: (props?: SearchSlotProps) => styles.barContainer(props),
    barInput: (props?: SearchSlotProps) => styles.barInput(props),
    barLeading: (props?: SearchSlotProps) => styles.barLeading(props),
    barRoot: (props?: SearchSlotProps) => styles.barRoot(props),
    barTrailing: (props?: SearchSlotProps) => styles.barTrailing(props),
    empty: (props?: SearchSlotProps) => styles.empty(props),
    resultContent: (props?: SearchSlotProps) => styles.resultContent(props),
    resultEnd: (props?: SearchSlotProps) => styles.resultEnd(props),
    resultHeadline: (props?: SearchSlotProps) => styles.resultHeadline(props),
    resultItem: (props?: SearchSlotProps) => styles.resultItem(props),
    resultStart: (props?: SearchSlotProps) => styles.resultStart(props),
    resultSupportingText: (props?: SearchSlotProps) =>
      styles.resultSupportingText(props),
    results: (props?: SearchSlotProps) => styles.results(props),
    trigger: (props?: SearchSlotProps) => styles.trigger(props),
    triggerIcon: (props?: SearchSlotProps) => styles.triggerIcon(props),
    triggerLabel: (props?: SearchSlotProps) => styles.triggerLabel(props),
    viewDialog: (props?: SearchSlotProps) => styles.viewDialog(props),
    viewModal: (props?: SearchSlotProps) => styles.viewModal(props),
    viewOverlay: (props?: SearchSlotProps) => styles.viewOverlay(props),
  };
}

type SearchStyleProps = VariantProps<typeof searchStyles>;

export type SearchBarProps = Omit<
  RACSearchFieldProps,
  "children" | "className"
> &
  Pick<SearchStyleProps, "barVariant"> & {
    children?: never;
    className?: RACSearchFieldProps["className"];
    clearButtonLabel?: string;
    leading?: React.ReactNode;
    placeholder?: string;
    showClearButton?: boolean;
    trailing?: React.ReactNode;
  };

export function SearchBar({
  "aria-label": ariaLabel,
  "aria-labelledby": ariaLabelledBy,
  barVariant = "bar",
  className,
  clearButtonLabel = "Clear search",
  leading,
  placeholder = "Search",
  showClearButton = true,
  trailing,
  ...props
}: SearchBarProps) {
  const { barClear, barContainer, barInput, barLeading, barRoot, barTrailing } =
    searchVariants();
  const resolvedAriaLabel =
    ariaLabel ?? (ariaLabelledBy === undefined ? placeholder : undefined);

  return (
    <RACSearchField
      aria-label={resolvedAriaLabel}
      aria-labelledby={ariaLabelledBy}
      className={composeRenderProps(className, (className) =>
        barRoot({ className }),
      )}
      data-slot="search-bar"
      data-variant={barVariant}
      {...props}
    >
      <div
        className={barContainer({ barVariant })}
        data-slot="search-bar-container"
      >
        <span className={barLeading()} data-slot="search-bar-leading">
          <RACProvider values={[[ButtonContext, {}]]}>
            {leading ?? <SearchIcon aria-hidden="true" />}
          </RACProvider>
        </span>
        <RACInput
          className={barInput()}
          data-slot="search-bar-input"
          placeholder={placeholder}
        />
        {showClearButton ? (
          <IconButton
            aria-label={clearButtonLabel}
            className={barClear()}
            data-slot="search-bar-clear"
            size="xs"
            variant="standard"
          >
            <XIcon />
          </IconButton>
        ) : null}
        {trailing === undefined ? null : (
          <span className={barTrailing()} data-slot="search-bar-trailing">
            <RACProvider values={[[ButtonContext, {}]]}>{trailing}</RACProvider>
          </span>
        )}
      </div>
    </RACSearchField>
  );
}

type SearchViewListBoxProps<T extends object> = Omit<
  RACListBoxProps<T>,
  "children" | "className" | "items" | "renderEmptyState"
> & {
  className?: RACListBoxProps<T>["className"];
};

export type SearchViewProps<T extends object = object> = Omit<
  RACAutocompleteProps<T>,
  "children"
> &
  Pick<SearchStyleProps, "placement"> & {
    children?: RACListBoxProps<T>["children"];
    className?: string;
    defaultOpen?: boolean;
    dialogLabel?: string;
    isDismissable?: boolean;
    isOpen?: boolean;
    items?: RACListBoxProps<T>["items"];
    listBoxProps?: SearchViewListBoxProps<T>;
    modalClassName?: string;
    onOpenChange?: (isOpen: boolean) => void;
    placeholder?: string;
    renderEmptyState?: RACListBoxProps<T>["renderEmptyState"];
    searchFieldLabel?: string;
    triggerLabel?: React.ReactNode;
  };

export function SearchView<T extends object = object>({
  children,
  className,
  defaultOpen = false,
  dialogLabel = "Search",
  isDismissable = true,
  isOpen: controlledOpen,
  items,
  listBoxProps,
  modalClassName,
  onOpenChange,
  placeholder = "Search",
  placement = "docked",
  renderEmptyState,
  searchFieldLabel = placeholder,
  triggerLabel,
  ...autocompleteProps
}: SearchViewProps<T>) {
  const {
    empty,
    results,
    trigger,
    triggerIcon,
    triggerLabel: triggerLabelClassName,
    viewDialog,
    viewModal,
    viewOverlay,
  } = searchVariants();
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = controlledOpen ?? uncontrolledOpen;

  function setOpen(nextOpen: boolean) {
    if (!isControlled) {
      setUncontrolledOpen(nextOpen);
    }

    onOpenChange?.(nextOpen);
  }

  return (
    <RACDialogTrigger isOpen={isOpen} onOpenChange={setOpen}>
      <RACButton
        className={trigger({ className })}
        data-slot="search-view-trigger"
      >
        <SearchIcon aria-hidden="true" className={triggerIcon()} />
        <span className={triggerLabelClassName()}>
          {triggerLabel ?? placeholder}
        </span>
      </RACButton>
      <RACModalOverlay
        className={viewOverlay({ placement })}
        isDismissable={isDismissable}
      >
        <RACModal
          className={viewModal({ className: modalClassName, placement })}
          data-slot="search-view-modal"
        >
          <RACDialog
            aria-label={dialogLabel}
            className={viewDialog()}
            data-slot="search-view"
          >
            <RACAutocomplete {...autocompleteProps}>
              <SearchBar
                aria-label={searchFieldLabel}
                autoFocus
                barVariant="view"
                leading={
                  <IconButton
                    aria-label="Close search"
                    onPress={() => setOpen(false)}
                    size="xs"
                    slot={null}
                    variant="standard"
                  >
                    <ArrowLeftIcon />
                  </IconButton>
                }
                placeholder={placeholder}
              />
              <RACListBox
                {...listBoxProps}
                className={composeRenderProps(
                  listBoxProps?.className,
                  (className) => results({ className }),
                )}
                data-slot="search-view-results"
                items={items}
                renderEmptyState={
                  renderEmptyState ??
                  (() => <div className={empty()}>No results</div>)
                }
                selectionMode={listBoxProps?.selectionMode ?? "single"}
              >
                {children}
              </RACListBox>
            </RACAutocomplete>
          </RACDialog>
        </RACModal>
      </RACModalOverlay>
    </RACDialogTrigger>
  );
}

type SearchResultSlot =
  | React.ReactNode
  | ((props: ListBoxItemRenderProps) => React.ReactNode);

export type SearchViewItemProps<T extends object = object> = Omit<
  RACListBoxItemProps<T>,
  "children" | "className"
> &
  Pick<SearchStyleProps, "itemLines"> & {
    children?: RACListBoxItemProps<T>["children"];
    className?: RACListBoxItemProps<T>["className"];
    end?: SearchResultSlot;
    headline?: React.ReactNode;
    start?: SearchResultSlot;
    supportingText?: React.ReactNode;
  };

export function SearchViewItem<T extends object = object>({
  children,
  className,
  end: endContent,
  headline,
  itemLines,
  start: startContent,
  supportingText,
  textValue,
  ...props
}: SearchViewItemProps<T>) {
  const {
    resultContent,
    resultEnd,
    resultHeadline,
    resultItem,
    resultStart,
    resultSupportingText,
  } = searchVariants();
  const resolvedTextValue =
    textValue ??
    (typeof headline === "string"
      ? headline
      : typeof children === "string"
        ? children
        : undefined);
  const resolvedItemLines =
    itemLines ?? (supportingText === undefined ? "one" : "two");

  return (
    <RACListBoxItem
      className={composeRenderProps(className, (className) =>
        resultItem({ className, itemLines: resolvedItemLines }),
      )}
      data-slot="search-view-item"
      textValue={resolvedTextValue}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => {
        const renderedStart = renderSearchResultSlot(startContent, renderProps);
        const renderedEnd = renderSearchResultSlot(endContent, renderProps);
        const headlineContent = headline ?? children;

        return (
          <>
            <span className={resultStart()} data-slot="search-view-item-start">
              {renderedStart ?? <SearchIcon aria-hidden="true" />}
            </span>
            <span
              className={resultContent()}
              data-slot="search-view-item-content"
            >
              {headlineContent === undefined ||
              headlineContent === null ? null : (
                <span
                  className={resultHeadline()}
                  data-slot="search-view-item-headline"
                >
                  {headlineContent}
                </span>
              )}
              {supportingText === undefined ? null : (
                <RACText
                  className={resultSupportingText()}
                  data-slot="search-view-item-supporting-text"
                  slot="description"
                >
                  {supportingText}
                </RACText>
              )}
            </span>
            {endContent === undefined ? null : (
              <span className={resultEnd()} data-slot="search-view-item-end">
                {renderedEnd}
              </span>
            )}
          </>
        );
      })}
    </RACListBoxItem>
  );
}

function renderSearchResultSlot(
  slot: SearchResultSlot | undefined,
  renderProps: ListBoxItemRenderProps,
) {
  return typeof slot === "function" ? slot(renderProps) : slot;
}
