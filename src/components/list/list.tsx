import type * as React from "react";
import {
  GridList as RACGridList,
  GridListHeader as RACGridListHeader,
  GridListItem as RACGridListItem,
  GridListSection as RACGridListSection,
  Text as RACText,
  composeRenderProps,
  type GridListItemRenderProps,
  type GridListItemProps as RACGridListItemProps,
  type GridListProps as RACGridListProps,
  type GridListSectionProps as RACGridListSectionProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const listStyles = tv({
  slots: {
    list: [
      "grid w-full overflow-hidden bg-[#fffbfe] py-2 text-[#1d1b20] outline-none",
      "dark:bg-[#1d1b20] dark:text-[#e6e0e9]",
    ],
    section: "grid gap-0",
    sectionHeader:
      "px-4 pt-3 pb-2 text-sm leading-5 font-medium text-[#49454f] dark:text-[#cac4d0]",
    item: [
      "group/list-item relative isolate grid cursor-default items-center gap-x-4 overflow-hidden px-4 outline-none select-none",
      "text-[#1d1b20] transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "data-hovered:before:opacity-[0.08] data-focus-visible:before:opacity-[0.1] data-pressed:before:opacity-[0.1]",
      "data-selected:bg-[#e8def8]",
      "data-disabled:cursor-not-allowed data-disabled:text-[#1D1B20]/38 data-disabled:before:opacity-0",
      "dark:text-[#e6e0e9] dark:data-selected:bg-[#4a4458] dark:data-disabled:text-[#E6E0E9]/38",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
    ],
    start:
      "relative z-10 flex size-10 items-center justify-center self-center text-[#49454f] group-data-selected/list-item:text-[#6750a4] group-data-disabled/list-item:text-[#1D1B20]/38 dark:text-[#cac4d0] dark:group-data-selected/list-item:text-[#d0bcff] dark:group-data-disabled/list-item:text-[#E6E0E9]/38 [&_svg]:size-6 [&_svg]:shrink-0",
    content: "relative z-10 grid min-w-0 gap-0.5",
    overline:
      "truncate text-xs leading-4 font-medium text-[#49454f] dark:text-[#cac4d0]",
    headline: "truncate text-base leading-6 font-normal text-current",
    supportingText:
      "line-clamp-2 text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    trailingSupportingText:
      "relative z-10 justify-self-end text-xs leading-4 text-[#49454f] dark:text-[#cac4d0]",
    end: [
      "relative z-10 flex min-h-10 min-w-10 items-center justify-end gap-2 self-center text-[#49454f]",
      "group-data-selected/list-item:text-[#6750a4] group-data-disabled/list-item:text-[#1D1B20]/38",
      "dark:text-[#cac4d0] dark:group-data-selected/list-item:text-[#d0bcff] dark:group-data-disabled/list-item:text-[#E6E0E9]/38",
      "[&_svg]:size-6 [&_svg]:shrink-0",
    ],
  },
  variants: {
    hasEnd: {
      false: {},
      true: {},
    },
    hasStart: {
      false: {},
      true: {},
    },
    lines: {
      one: {
        item: "min-h-14 py-1",
      },
      two: {
        item: "min-h-18 py-2",
      },
      three: {
        item: "min-h-22 py-3",
      },
    },
  },
  compoundVariants: [
    {
      hasEnd: false,
      hasStart: false,
      class: {
        item: "grid-cols-[minmax(0,1fr)]",
      },
    },
    {
      hasEnd: true,
      hasStart: false,
      class: {
        item: "grid-cols-[minmax(0,1fr)_auto]",
      },
    },
    {
      hasEnd: false,
      hasStart: true,
      class: {
        item: "grid-cols-[40px_minmax(0,1fr)]",
      },
    },
    {
      hasEnd: true,
      hasStart: true,
      class: {
        item: "grid-cols-[40px_minmax(0,1fr)_auto]",
      },
    },
  ],
  defaultVariants: {
    hasEnd: false,
    hasStart: false,
    lines: "one",
  },
});

type ListSlotProps = Parameters<ReturnType<typeof listStyles>["list"]>[0];

export function listVariants() {
  const styles = listStyles();

  return {
    content: (props?: ListSlotProps) => styles.content(props),
    end: (props?: ListSlotProps) => styles.end(props),
    headline: (props?: ListSlotProps) => styles.headline(props),
    item: (props?: ListSlotProps) => styles.item(props),
    list: (props?: ListSlotProps) => styles.list(props),
    overline: (props?: ListSlotProps) => styles.overline(props),
    section: (props?: ListSlotProps) => styles.section(props),
    sectionHeader: (props?: ListSlotProps) => styles.sectionHeader(props),
    start: (props?: ListSlotProps) => styles.start(props),
    supportingText: (props?: ListSlotProps) => styles.supportingText(props),
    trailingSupportingText: (props?: ListSlotProps) =>
      styles.trailingSupportingText(props),
  };
}

export type ListProps<T extends object = object> = Omit<
  RACGridListProps<T>,
  "className"
> &
  Pick<VariantProps<typeof listStyles>, never> & {
    className?: RACGridListProps<T>["className"];
  };

export function List<T extends object = object>({
  className,
  ...props
}: ListProps<T>) {
  const { list } = listVariants();

  return (
    <RACGridList
      className={composeRenderProps(className, (className) =>
        list({ className }),
      )}
      data-slot="list"
      {...props}
    />
  );
}

type ListLineCount = "one" | "three" | "two";
type ListItemSlot =
  | React.ReactNode
  | ((props: GridListItemRenderProps) => React.ReactNode);

export type ListItemProps<T extends object = object> = Omit<
  RACGridListItemProps<T>,
  "children" | "className"
> &
  Omit<VariantProps<typeof listStyles>, "hasEnd" | "hasStart"> & {
    children?: RACGridListItemProps<T>["children"];
    className?: RACGridListItemProps<T>["className"];
    end?: ListItemSlot;
    headline?: React.ReactNode;
    overline?: React.ReactNode;
    start?: ListItemSlot;
    supportingText?: React.ReactNode;
    trailingSupportingText?: React.ReactNode;
  };

export function ListItem<T extends object = object>({
  children,
  className,
  end: endContent,
  headline,
  lines,
  overline,
  start: startContent,
  supportingText,
  textValue,
  trailingSupportingText,
  ...props
}: ListItemProps<T>) {
  const {
    content,
    end,
    headline: headlineClassName,
    item,
    overline: overlineClassName,
    start,
    supportingText: supportingTextClassName,
    trailingSupportingText: trailingSupportingTextClassName,
  } = listVariants();
  const hasStart = startContent !== undefined;
  const hasEnd =
    endContent !== undefined || trailingSupportingText !== undefined;
  const resolvedLines = lines ?? getListItemLineCount(overline, supportingText);
  const resolvedTextValue =
    textValue ??
    (typeof headline === "string"
      ? headline
      : typeof children === "string"
        ? children
        : undefined);

  return (
    <RACGridListItem
      className={composeRenderProps(className, (className) =>
        item({
          className,
          hasEnd,
          hasStart,
          lines: resolvedLines,
        }),
      )}
      data-slot="list-item"
      textValue={resolvedTextValue}
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => {
        const renderedStart = renderListItemSlot(startContent, renderProps);
        const renderedEnd = renderListItemSlot(endContent, renderProps);
        const headlineContent = headline ?? children;

        return (
          <>
            {hasStart ? (
              <span className={start()} data-slot="list-item-start">
                {renderedStart}
              </span>
            ) : null}
            <span className={content()} data-slot="list-item-content">
              {overline === undefined ? null : (
                <span
                  className={overlineClassName()}
                  data-slot="list-item-overline"
                >
                  {overline}
                </span>
              )}
              {headlineContent === undefined ||
              headlineContent === null ? null : (
                <span
                  className={headlineClassName()}
                  data-slot="list-item-headline"
                >
                  {headlineContent}
                </span>
              )}
              {supportingText === undefined ? null : (
                <RACText
                  className={supportingTextClassName()}
                  data-slot="list-item-supporting-text"
                  slot="description"
                >
                  {supportingText}
                </RACText>
              )}
            </span>
            {hasEnd ? (
              <span className={end()} data-slot="list-item-end">
                {trailingSupportingText === undefined ? null : (
                  <span
                    className={trailingSupportingTextClassName()}
                    data-slot="list-item-trailing-supporting-text"
                  >
                    {trailingSupportingText}
                  </span>
                )}
                {renderedEnd}
              </span>
            ) : null}
          </>
        );
      })}
    </RACGridListItem>
  );
}

export type ListSectionProps<T extends object = object> = Omit<
  RACGridListSectionProps<T>,
  "children" | "className"
> & {
  children?: React.ReactNode;
  className?: string;
  title?: React.ReactNode;
};

export function ListSection<T extends object = object>({
  children,
  className,
  title,
  ...props
}: ListSectionProps<T>) {
  const { section, sectionHeader } = listVariants();

  return (
    <RACGridListSection
      className={section({ className })}
      data-slot="list-section"
      {...props}
    >
      {title === undefined ? null : (
        <RACGridListHeader
          className={sectionHeader()}
          data-slot="list-section-header"
        >
          {title}
        </RACGridListHeader>
      )}
      {children}
    </RACGridListSection>
  );
}

function getListItemLineCount(
  overline: React.ReactNode,
  supportingText: React.ReactNode,
): ListLineCount {
  if (overline !== undefined && supportingText !== undefined) {
    return "three";
  }

  if (overline !== undefined || supportingText !== undefined) {
    return "two";
  }

  return "one";
}

function renderListItemSlot(
  slot: ListItemSlot | undefined,
  renderProps: GridListItemRenderProps,
) {
  return typeof slot === "function" ? slot(renderProps) : slot;
}
