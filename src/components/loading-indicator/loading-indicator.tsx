import { tv, type VariantProps } from "tailwind-variants";

export const loadingIndicatorStyles = tv({
  slots: {
    root: "inline-flex flex-col items-center gap-4",
    spinner: "motion-reduce:animate-none",
    label: "text-sm leading-5 text-[#1d1b20] dark:text-[#e6e0e9]",
  },
  variants: {
    size: {
      xs: { spinner: "size-6" },
      sm: { spinner: "size-8" },
      md: { spinner: "size-10" },
      lg: { spinner: "size-12" },
      xl: { spinner: "size-14" },
    },
  },
  defaultVariants: {
    size: "lg",
  },
});

export type LoadingIndicatorVariantProps = VariantProps<
  typeof loadingIndicatorStyles
>;
type LoadingIndicatorSlotProps = Parameters<
  ReturnType<typeof loadingIndicatorStyles>["root"]
>[0];

export function loadingIndicatorVariants() {
  const styles = loadingIndicatorStyles();

  return {
    label: (props?: LoadingIndicatorSlotProps) => styles.label(props),
    root: (props?: LoadingIndicatorSlotProps) => styles.root(props),
    spinner: (props?: LoadingIndicatorSlotProps) => styles.spinner(props),
  };
}

export type LoadingIndicatorProps = React.ComponentProps<"div"> &
  VariantProps<typeof loadingIndicatorStyles> & {
    label?: React.ReactNode;
  };

export function LoadingIndicator({
  children,
  className,
  label,
  size = "lg",
  ...props
}: LoadingIndicatorProps) {
  const { label: labelClassName, root, spinner } = loadingIndicatorVariants();

  return (
    <div
      className={root({ className, size })}
      data-slot="loading-indicator"
      data-size={size}
      role="status"
      {...props}
    >
      <svg
        aria-hidden="true"
        className={spinner()}
        data-slot="loading-indicator-spinner"
        viewBox="0 0 48 48"
      >
        <circle
          className="fill-none stroke-[#1D1B20]/10 dark:stroke-[#E6E0E9]/10"
          cx="24"
          cy="24"
          r="22"
          strokeWidth="4"
        />
        <circle
          className="animate-[m3-spinner-arc_1.4s_linear_infinite] fill-none stroke-[#6750a4] motion-reduce:animate-none dark:stroke-[#d0bcff]"
          cx="24"
          cy="24"
          r="22"
          strokeLinecap="round"
          strokeWidth="4"
        />
      </svg>
      {children === undefined && label === undefined ? null : (
        <span className={labelClassName()} data-slot="loading-indicator-label">
          {children ?? label}
        </span>
      )}
    </div>
  );
}
