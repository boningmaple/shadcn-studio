import { tv, type VariantProps } from "tailwind-variants";

import { Spinner } from "@/ui/shadcn/react-aria/spinner";

export const m3LoadingIndicatorStyles = tv({
  slots: {
    root: [
      "inline-flex items-center justify-center text-[#1d1b20]",
      "dark:text-[#e6e0e9]",
    ],
    indicator: [
      "inline-flex shrink-0 items-center justify-center rounded-full",
      "transition-[background-color,color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "motion-reduce:transition-none",
    ],
    spinner: "shrink-0 text-current motion-reduce:animate-none",
    label: "text-sm leading-5 text-current",
  },
  variants: {
    size: {
      xs: { indicator: "size-6", spinner: "size-4" },
      sm: { indicator: "size-8", spinner: "size-5" },
      md: { indicator: "size-10", spinner: "size-6" },
      lg: { indicator: "size-12", spinner: "size-7" },
      xl: { indicator: "size-14", spinner: "size-8" },
    },
    appearance: {
      plain: {
        indicator: "bg-transparent text-[#6750a4] dark:text-[#d0bcff]",
      },
      tonal: {
        indicator:
          "bg-[#e8def8] text-[#21005d] dark:bg-[#4a4458] dark:text-[#e8def8]",
      },
      surface: {
        indicator:
          "bg-[#f7f2fa] text-[#6750a4] shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)] dark:bg-[#211f26] dark:text-[#d0bcff]",
      },
      inverse: {
        indicator:
          "bg-[#322f35] text-[#f5eff7] dark:bg-[#e6e0e9] dark:text-[#322f35]",
      },
    },
    layout: {
      inline: {
        root: "flex-row gap-3",
      },
      stacked: {
        root: "flex-col gap-3 text-center",
      },
    },
  },
  defaultVariants: {
    appearance: "plain",
    layout: "stacked",
    size: "md",
  },
});

export type M3LoadingIndicatorVariantProps = VariantProps<
  typeof m3LoadingIndicatorStyles
>;
type LoadingIndicatorSlotProps = Parameters<
  ReturnType<typeof m3LoadingIndicatorStyles>["root"]
>[0];

export function m3LoadingIndicatorVariants() {
  const styles = m3LoadingIndicatorStyles();

  return {
    indicator: (props?: LoadingIndicatorSlotProps) => styles.indicator(props),
    label: (props?: LoadingIndicatorSlotProps) => styles.label(props),
    root: (props?: LoadingIndicatorSlotProps) => styles.root(props),
    spinner: (props?: LoadingIndicatorSlotProps) => styles.spinner(props),
  };
}

export type M3LoadingIndicatorProps = React.ComponentProps<"div"> &
  VariantProps<typeof m3LoadingIndicatorStyles> & {
    label?: React.ReactNode;
  };

export function M3LoadingIndicator({
  "aria-label": ariaLabel,
  appearance = "plain",
  children,
  className,
  label,
  layout = "stacked",
  size = "lg",
  ...props
}: M3LoadingIndicatorProps) {
  const {
    indicator,
    label: labelClassName,
    root,
    spinner,
  } = m3LoadingIndicatorVariants();
  const visibleLabel = children ?? label;
  const resolvedAriaLabel =
    ariaLabel ?? (visibleLabel === undefined ? "Loading" : undefined);

  return (
    <div
      aria-label={resolvedAriaLabel}
      aria-live="polite"
      className={root({ className, layout })}
      data-appearance={appearance}
      data-layout={layout}
      data-slot="loading-indicator"
      data-size={size}
      role="status"
      {...props}
    >
      <span
        aria-hidden="true"
        className={indicator({ appearance, size })}
        data-slot="loading-indicator-container"
      >
        <Spinner
          aria-hidden="true"
          aria-label={undefined}
          className={spinner({ size })}
          data-slot="loading-indicator-spinner"
          role="presentation"
        />
      </span>
      {visibleLabel === undefined ? null : (
        <span className={labelClassName()} data-slot="loading-indicator-label">
          {visibleLabel}
        </span>
      )}
    </div>
  );
}
