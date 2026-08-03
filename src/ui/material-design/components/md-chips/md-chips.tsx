import * as React from "react";
import { CheckIcon } from "lucide-react";
import {
  Tag as RACTag,
  TagGroup as RACTagGroup,
  TagList as RACTagList,
  composeRenderProps,
  type TagListProps as RACTagListProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

const levelOneShadow =
  "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]";
const levelTwoShadow =
  "group-data-hovered/chip:shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]";

const chipStyles = tv({
  slots: {
    group: "block max-w-full",
    list: "flex max-w-full flex-wrap items-center gap-x-2 gap-y-0 outline-none",
    item: [
      "group/chip relative inline-flex min-h-12 min-w-12 shrink-0 cursor-pointer items-center justify-center outline-none select-none",
      "data-disabled:cursor-not-allowed",
    ],
    surface: [
      "relative isolate inline-flex h-8 max-w-full items-center gap-2 overflow-hidden rounded-[8px] border border-transparent ps-4 pe-4",
      "text-sm leading-5 font-medium whitespace-nowrap outline-0 outline-solid outline-offset-0 outline-transparent",
      "transition-[background-color,border-color,box-shadow,color,outline-offset,outline-width] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "has-[>[data-slot=chip-icon]]:ps-2 has-[>[data-slot=chip-selection-indicator]]:ps-2",
      "group-data-hovered/chip:before:opacity-[0.08]",
      "group-data-focus-visible/chip:before:opacity-[0.1]",
      "group-data-pressed/chip:before:opacity-[0.1]",
      "group-data-focus-visible/chip:outline-2 group-data-focus-visible/chip:outline-solid group-data-focus-visible/chip:outline-offset-2 group-data-focus-visible/chip:outline-[#6750a4]",
      "dark:group-data-focus-visible/chip:outline-[#d0bcff]",
      "group-data-disabled/chip:before:opacity-0 group-data-disabled/chip:shadow-none",
      "group-data-disabled/chip:text-[#1D1B20]/38 dark:group-data-disabled/chip:text-[#E6E0E9]/38",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
    ],
    icon: [
      "relative z-10 flex size-[18px] shrink-0 items-center justify-center",
      "[&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0",
      "group-data-disabled/chip:text-[#1D1B20]/38 dark:group-data-disabled/chip:text-[#E6E0E9]/38",
    ],
    selectionIndicator: [
      "relative z-10 flex size-[18px] shrink-0 items-center justify-center",
      "text-[#1d192b] dark:text-[#e8def8]",
      "[&_svg]:pointer-events-none [&_svg]:size-[18px] [&_svg]:shrink-0",
      "group-data-disabled/chip:text-[#1D1B20]/38 dark:group-data-disabled/chip:text-[#E6E0E9]/38",
    ],
    label: "relative z-10",
  },
  variants: {
    variant: {
      assist: {
        surface: "text-[#1d1b20] dark:text-[#e6e0e9]",
        icon: "text-[#6750a4] dark:text-[#d0bcff]",
      },
      filter: {
        surface: [
          "text-[#49454f] dark:text-[#cac4d0]",
          "group-data-selected/chip:border-transparent group-data-selected/chip:bg-[#e8def8] group-data-selected/chip:text-[#1d192b]",
          "dark:group-data-selected/chip:bg-[#4a4458] dark:group-data-selected/chip:text-[#e8def8]",
          "group-data-selected/chip:group-data-disabled/chip:bg-[#1D1B20]/12 group-data-selected/chip:group-data-disabled/chip:text-[#1D1B20]/38",
          "dark:group-data-selected/chip:group-data-disabled/chip:bg-[#E6E0E9]/12 dark:group-data-selected/chip:group-data-disabled/chip:text-[#E6E0E9]/38",
        ],
        icon: "text-[#49454f] dark:text-[#cac4d0]",
      },
      suggestion: {
        surface: "text-[#49454f] dark:text-[#cac4d0]",
        icon: "text-[#49454f] dark:text-[#cac4d0]",
      },
    },
    surface: {
      outlined: {
        surface: [
          "bg-transparent border-[#79747e] dark:border-[#938f99]",
          "group-data-disabled/chip:border-[#1D1B20]/12 dark:group-data-disabled/chip:border-[#E6E0E9]/12",
        ],
      },
      elevated: {
        surface: [
          "bg-[#f7f2fa] dark:bg-[#1d1b20]",
          levelOneShadow,
          levelTwoShadow,
          "group-data-focus-visible/chip:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
          "group-data-pressed/chip:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
          "group-data-disabled/chip:bg-[#1D1B20]/12 dark:group-data-disabled/chip:bg-[#E6E0E9]/12",
        ],
      },
    },
  },
  compoundVariants: [
    {
      variant: "filter",
      surface: "outlined",
      class: {
        surface:
          "group-data-selected/chip:group-data-hovered/chip:shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
      },
    },
  ],
  defaultVariants: {
    variant: "assist",
    surface: "outlined",
  },
});

export type MDChipVariantProps = VariantProps<typeof chipStyles>;
type ChipVariant = NonNullable<MDChipVariantProps["variant"]>;
type ChipSurface = NonNullable<MDChipVariantProps["surface"]>;
type ChipSlotProps = Parameters<ReturnType<typeof chipStyles>["group"]>[0];

export function mdChipVariants({
  surface = "outlined",
  variant = "assist",
}: MDChipVariantProps = {}) {
  const resolve = () => chipStyles({ surface, variant });

  return {
    group: (props?: ChipSlotProps) => resolve().group(props),
    icon: (props?: ChipSlotProps) => resolve().icon(props),
    item: (props?: ChipSlotProps) => resolve().item(props),
    label: (props?: ChipSlotProps) => resolve().label(props),
    list: (props?: ChipSlotProps) => resolve().list(props),
    selectionIndicator: (props?: ChipSlotProps) =>
      resolve().selectionIndicator(props),
    surface: (props?: ChipSlotProps) => resolve().surface(props),
  };
}

type ChipStyleContextValue = {
  surface: ChipSurface;
  variant: ChipVariant;
};

const ChipStyleContext = React.createContext<ChipStyleContextValue>({
  surface: "outlined",
  variant: "assist",
});

export type MDChipGroupProps = Omit<
  React.ComponentPropsWithRef<typeof RACTagGroup>,
  "selectionMode"
> &
  MDChipVariantProps & {
    selectionMode?: "single" | "multiple" | "none";
  };

export function MDChipGroup({
  className,
  selectionMode,
  surface = "outlined",
  variant = "assist",
  ...props
}: MDChipGroupProps) {
  const { group } = mdChipVariants({ surface, variant });
  const effectiveSelectionMode =
    variant === "filter" ? (selectionMode ?? "multiple") : "none";

  return (
    <ChipStyleContext.Provider value={{ surface, variant }}>
      <RACTagGroup
        className={group({ className })}
        data-slot="chip-group"
        data-surface={surface}
        data-variant={variant}
        selectionMode={effectiveSelectionMode}
        {...props}
      />
    </ChipStyleContext.Provider>
  );
}

export type MDChipListProps<T extends object> = RACTagListProps<T> &
  React.RefAttributes<HTMLDivElement>;

export function MDChipList<T extends object>({
  className,
  ...props
}: MDChipListProps<T>) {
  const { surface, variant } = React.useContext(ChipStyleContext);
  const { list } = mdChipVariants({ surface, variant });

  return (
    <RACTagList
      className={composeRenderProps(className, (className) =>
        list({ className }),
      )}
      data-slot="chip-list"
      {...props}
    />
  );
}

export type MDChipProps = React.ComponentPropsWithRef<typeof RACTag> & {
  icon?: React.ReactNode;
};

export function MDChip({
  children,
  className,
  icon: iconContent,
  onAction,
  onPress,
  ref,
  textValue,
  ...props
}: MDChipProps) {
  const chipRef = React.useRef<HTMLDivElement>(null);
  const { surface: surfaceVariant, variant } =
    React.useContext(ChipStyleContext);
  const { icon, item, label, selectionIndicator, surface } = mdChipVariants({
    surface: surfaceVariant,
    variant,
  });
  const resolvedTextValue =
    textValue ?? (typeof children === "string" ? children : undefined);

  React.useImperativeHandle(ref, () => chipRef.current as HTMLDivElement);

  React.useEffect(() => {
    const element = chipRef.current;

    if (element === null || variant === "filter" || onAction === undefined) {
      return;
    }

    const handleActionKeyDown = (event: KeyboardEvent) => {
      if (
        !event.defaultPrevented &&
        (event.key === "Enter" || event.key === " " || event.key === "Spacebar")
      ) {
        event.preventDefault();
        event.stopPropagation();
        onAction();
      }
    };

    element.addEventListener("keydown", handleActionKeyDown, true);
    return () => {
      element.removeEventListener("keydown", handleActionKeyDown, true);
    };
  }, [onAction, variant]);

  return (
    <RACTag
      ref={chipRef}
      className={composeRenderProps(className, (className) =>
        item({ className }),
      )}
      data-slot="chip"
      onAction={onAction}
      onPress={onPress}
      textValue={resolvedTextValue}
      {...props}
    >
      {composeRenderProps(children, (children, { isSelected }) => (
        <span className={surface()} data-slot="chip-surface">
          {variant === "filter" && isSelected ? (
            <span
              className={selectionIndicator()}
              data-slot="chip-selection-indicator"
            >
              <CheckIcon aria-hidden="true" />
            </span>
          ) : iconContent === undefined ? null : (
            <span className={icon()} data-slot="chip-icon">
              {iconContent}
            </span>
          )}
          <span className={label()} data-slot="chip-label">
            {children}
          </span>
        </span>
      ))}
    </RACTag>
  );
}
