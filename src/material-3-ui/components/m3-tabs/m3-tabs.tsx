import * as React from "react";
import {
  SelectionIndicator as RACSelectionIndicator,
  Tab as RACTab,
  TabList as RACTabList,
  TabPanel as RACTabPanel,
  TabPanels as RACTabPanels,
  Tabs as RACTabs,
  composeRenderProps,
  type TabListProps as RACTabListProps,
  type TabPanelsProps as RACTabPanelsProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

const tabsStyles = tv({
  slots: {
    root: [
      "w-full bg-[#fffbfe] text-[#1d1b20]",
      "dark:bg-[#1d1b20] dark:text-[#e6e0e9]",
    ],
    list: ["flex border-[#cac4d0]", "dark:border-[#49454f]"],
    tab: [
      "group/tab relative isolate flex shrink-0 cursor-pointer items-center justify-center overflow-hidden px-4 text-sm leading-5 font-medium whitespace-nowrap outline-none select-none",
      "transition-colors duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:z-0 before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "data-hovered:before:opacity-[0.08]",
      "data-focus-visible:rounded-[20px] data-focus-visible:before:opacity-[0.1]",
      "data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-[-4px] data-focus-visible:outline-[#6750a4]",
      "dark:data-focus-visible:outline-[#d0bcff]",
      "data-pressed:before:opacity-[0.1]",
      "data-disabled:pointer-events-none data-disabled:cursor-not-allowed data-disabled:text-[#1D1B20]/38 data-disabled:before:opacity-0",
      "dark:data-disabled:text-[#E6E0E9]/38",
      "data-selected:data-disabled:text-[#1D1B20]/38",
      "dark:data-selected:data-disabled:text-[#E6E0E9]/38",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
      "[&_svg]:pointer-events-none [&_svg]:size-6 [&_svg]:shrink-0",
    ],
    content: "relative z-10 flex items-center justify-center",
    indicator: [
      "pointer-events-none absolute z-20 shrink-0 bg-[#6750a4]",
      "transition-[width,height,translate] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "dark:bg-[#d0bcff]",
      "group-data-disabled/tab:bg-[#1D1B20]/38",
      "dark:group-data-disabled/tab:bg-[#E6E0E9]/38",
      "motion-reduce:transition-none",
    ],
    panels: "min-w-0",
    panel: [
      "min-w-0 p-4 text-sm leading-6 outline-none sm:p-6",
      "data-focus-visible:outline-2 data-focus-visible:outline-solid data-focus-visible:outline-offset-[-2px] data-focus-visible:outline-[#6750a4]",
      "dark:data-focus-visible:outline-[#d0bcff]",
    ],
  },
  variants: {
    variant: {
      primary: {
        tab: [
          "text-[#49454f] data-selected:text-[#6750a4]",
          "dark:text-[#cac4d0] dark:data-selected:text-[#d0bcff]",
        ],
        content: "has-[svg]:flex-col has-[svg]:gap-1",
      },
      secondary: {
        tab: [
          "text-[#49454f] data-selected:text-[#1d1b20]",
          "dark:text-[#cac4d0] dark:data-selected:text-[#e6e0e9]",
        ],
      },
    },
    orientation: {
      horizontal: {
        root: "block",
        list: "w-full flex-row border-b",
        tab: "h-12 min-w-0 flex-1",
        content: "h-full",
        panels: "w-full",
      },
      vertical: {
        root: "flex items-stretch",
        list: "w-32 shrink-0 flex-col border-r sm:w-48",
        tab: "min-h-12 w-full flex-none",
        content: "w-full",
        panels: "min-w-0 flex-1",
      },
    },
  },
  compoundVariants: [
    {
      variant: "primary",
      orientation: "horizontal",
      class: {
        tab: "has-[svg]:h-16",
        content: "w-fit",
        indicator:
          "bottom-0 left-1/2 h-[3px] min-w-6 w-[calc(100%+4px)] -translate-x-1/2 rounded-t-[3px]",
      },
    },
    {
      variant: "secondary",
      orientation: "horizontal",
      class: {
        content: "w-full",
        indicator: "inset-x-0 bottom-0 h-0.5 w-full",
      },
    },
    {
      variant: "primary",
      orientation: "vertical",
      class: {
        tab: "has-[svg]:min-h-16",
        content: "h-fit has-[svg]:flex-row has-[svg]:gap-2",
        indicator:
          "top-1/2 right-0 h-[calc(100%+4px)] min-h-6 w-[3px] -translate-y-1/2 rounded-l-[3px]",
      },
    },
    {
      variant: "secondary",
      orientation: "vertical",
      class: {
        content: "h-full",
        indicator: "inset-y-0 right-0 h-full w-0.5",
      },
    },
  ],
  defaultVariants: {
    variant: "primary",
    orientation: "horizontal",
  },
});

export type M3TabsVariantProps = VariantProps<typeof tabsStyles>;
type TabsVariant = NonNullable<M3TabsVariantProps["variant"]>;
type TabsOrientation = NonNullable<M3TabsVariantProps["orientation"]>;
type TabsSlotProps = Parameters<ReturnType<typeof tabsStyles>["root"]>[0];

export function m3TabsVariants({
  orientation = "horizontal",
  variant = "primary",
}: M3TabsVariantProps = {}) {
  const resolve = () => tabsStyles({ orientation, variant });

  return {
    content: (props?: TabsSlotProps) => resolve().content(props),
    indicator: (props?: TabsSlotProps) => resolve().indicator(props),
    list: (props?: TabsSlotProps) => resolve().list(props),
    panel: (props?: TabsSlotProps) => resolve().panel(props),
    panels: (props?: TabsSlotProps) => resolve().panels(props),
    root: (props?: TabsSlotProps) => resolve().root(props),
    tab: (props?: TabsSlotProps) => resolve().tab(props),
  };
}

type TabsStyleContextValue = {
  orientation: TabsOrientation;
  variant: TabsVariant;
};

const TabsStyleContext = React.createContext<TabsStyleContextValue>({
  orientation: "horizontal",
  variant: "primary",
});

export type M3TabsProps = Omit<
  React.ComponentPropsWithRef<typeof RACTabs>,
  "orientation"
> &
  M3TabsVariantProps;

export function M3Tabs({
  className,
  orientation = "horizontal",
  variant = "primary",
  ...props
}: M3TabsProps) {
  const { root } = m3TabsVariants({ orientation, variant });

  return (
    <TabsStyleContext.Provider value={{ orientation, variant }}>
      <RACTabs
        data-slot="tabs"
        data-variant={variant}
        orientation={orientation}
        className={composeRenderProps(className, (className) =>
          root({ className }),
        )}
        {...props}
      />
    </TabsStyleContext.Provider>
  );
}

export type M3TabListProps<T extends object> = RACTabListProps<T> &
  React.RefAttributes<HTMLDivElement>;

export function M3TabList<T extends object>({
  className,
  ...props
}: M3TabListProps<T>) {
  const { orientation, variant } = React.useContext(TabsStyleContext);
  const { list } = m3TabsVariants({ orientation, variant });

  return (
    <RACTabList
      data-slot="tab-list"
      className={composeRenderProps(className, (className) =>
        list({ className }),
      )}
      {...props}
    />
  );
}

export type M3TabProps = React.ComponentPropsWithRef<typeof RACTab>;

export function M3Tab({ children, className, ...props }: M3TabProps) {
  const { orientation, variant } = React.useContext(TabsStyleContext);
  const { content, indicator, tab } = m3TabsVariants({
    orientation,
    variant,
  });

  return (
    <RACTab
      data-slot="tab"
      className={composeRenderProps(className, (className) =>
        tab({ className }),
      )}
      {...props}
    >
      {composeRenderProps(children, (children) => (
        <span className={content()} data-slot="tab-content">
          {children}
          <RACSelectionIndicator
            className={indicator()}
            data-slot="tab-indicator"
          />
        </span>
      ))}
    </RACTab>
  );
}

export type M3TabPanelsProps<T extends object> = RACTabPanelsProps<T> &
  React.RefAttributes<HTMLDivElement>;

export function M3TabPanels<T extends object>({
  className,
  ...props
}: M3TabPanelsProps<T>) {
  const { orientation, variant } = React.useContext(TabsStyleContext);
  const { panels } = m3TabsVariants({ orientation, variant });

  return (
    <RACTabPanels
      className={panels({ className })}
      data-slot="tab-panels"
      {...props}
    />
  );
}

export type M3TabPanelProps = React.ComponentPropsWithRef<typeof RACTabPanel>;

export function M3TabPanel({ className, ...props }: M3TabPanelProps) {
  const { orientation, variant } = React.useContext(TabsStyleContext);
  const { panel } = m3TabsVariants({ orientation, variant });

  return (
    <RACTabPanel
      data-slot="tab-panel"
      className={composeRenderProps(className, (className) =>
        panel({ className }),
      )}
      {...props}
    />
  );
}
