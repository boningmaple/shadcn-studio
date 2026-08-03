import type * as React from "react";
import {
  Label as RACLabel,
  ProgressBar as RACProgressBar,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const m3ProgressIndicatorStyles = tv({
  slots: {
    root: ["grid w-full min-w-0 gap-4 text-[#1d1b20]", "dark:text-[#e6e0e9]"],
    header: "flex w-full items-center justify-between gap-4",
    label: "text-sm leading-5 font-medium text-current",
    output: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    track:
      "relative block h-1 w-full min-w-0 overflow-hidden rounded-full bg-[#e6e0e9] dark:bg-[#49454f]",
    bar: [
      "absolute inset-y-0 start-0 rounded-full bg-[#6750a4]",
      "dark:bg-[#d0bcff]",
    ],
  },
});

export type M3ProgressIndicatorVariantProps = VariantProps<
  typeof m3ProgressIndicatorStyles
>;
type ProgressIndicatorSlotProps = Parameters<
  ReturnType<typeof m3ProgressIndicatorStyles>["root"]
>[0];

export function m3ProgressIndicatorVariants() {
  const styles = m3ProgressIndicatorStyles();

  return {
    bar: (props?: ProgressIndicatorSlotProps) => styles.bar(props),
    header: (props?: ProgressIndicatorSlotProps) => styles.header(props),
    label: (props?: ProgressIndicatorSlotProps) => styles.label(props),
    output: (props?: ProgressIndicatorSlotProps) => styles.output(props),
    root: (props?: ProgressIndicatorSlotProps) => styles.root(props),
    track: (props?: ProgressIndicatorSlotProps) => styles.track(props),
  };
}

export type M3LinearProgressIndicatorProps = React.ComponentPropsWithRef<
  typeof RACProgressBar
>;

export function M3LinearProgressIndicator({
  children,
  className,
  ...props
}: M3LinearProgressIndicatorProps) {
  const { bar, header, label, output, root, track } =
    m3ProgressIndicatorVariants();

  return (
    <RACProgressBar
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="linear-progress-indicator"
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          {children === undefined || children === null ? null : (
            <div
              className={header()}
              data-slot="linear-progress-indicator-header"
            >
              <RACLabel
                className={label()}
                data-slot="linear-progress-indicator-label"
              >
                {children}
              </RACLabel>
              <span
                className={output()}
                data-slot="linear-progress-indicator-output"
              >
                {renderProps.percentage ?? ""}
                {renderProps.percentage === undefined ? "" : "%"}
              </span>
            </div>
          )}
          <div className={track()} data-slot="linear-progress-indicator-track">
            {renderProps.isIndeterminate ? (
              <span
                className={bar({
                  className:
                    "animate-[m3-linear-indeterminate_2s_cubic-bezier(0.4,0,0.2,1)_infinite] motion-reduce:animate-none",
                })}
                data-slot="linear-progress-indicator-bar"
                style={{ width: "40%" }}
              />
            ) : (
              <span
                className={bar()}
                data-slot="linear-progress-indicator-bar"
                style={{ inlineSize: `${renderProps.percentage}%` }}
              />
            )}
          </div>
        </>
      ))}
    </RACProgressBar>
  );
}

export type M3CircularProgressIndicatorProps = React.ComponentPropsWithRef<
  typeof RACProgressBar
>;

export function M3CircularProgressIndicator({
  children,
  className,
  ...props
}: M3CircularProgressIndicatorProps) {
  const { header, label, output, root } = m3ProgressIndicatorVariants();

  return (
    <RACProgressBar
      className={composeRenderProps(className, (className) =>
        root({ className: `${className ?? ""} justify-items-center` }),
      )}
      data-slot="circular-progress-indicator"
      {...props}
    >
      {composeRenderProps(children, (children, renderProps) => (
        <>
          <svg
            aria-hidden="true"
            className="size-12 shrink-0"
            data-slot="circular-progress-indicator-svg"
            viewBox="0 0 48 48"
          >
            <circle
              className="fill-none stroke-[#1D1B20]/10 dark:stroke-[#E6E0E9]/10"
              cx="24"
              cy="24"
              r="22"
              strokeWidth="4"
            />
            {renderProps.isIndeterminate ? (
              <circle
                className="animate-[m3-spinner-arc_1.4s_linear_infinite] fill-none stroke-[#6750a4] motion-reduce:animate-none dark:stroke-[#d0bcff]"
                cx="24"
                cy="24"
                r="22"
                strokeLinecap="round"
                strokeWidth="4"
              />
            ) : (
              <circle
                className="fill-none stroke-[#6750a4] transition-[stroke-dasharray] duration-200 ease-[cubic-bezier(0.2,0,0,1)] dark:stroke-[#d0bcff]"
                cx="24"
                cy="24"
                r="22"
                strokeDasharray={`${(2 * Math.PI * 22 * (renderProps.percentage ?? 0)) / 100} ${2 * Math.PI * 22}`}
                strokeLinecap="round"
                strokeWidth="4"
                transform="rotate(-90 24 24)"
              />
            )}
          </svg>
          {children === undefined || children === null ? null : (
            <div
              className={header()}
              data-slot="circular-progress-indicator-header"
            >
              <RACLabel
                className={label()}
                data-slot="circular-progress-indicator-label"
              >
                {children}
              </RACLabel>
              <span
                className={output()}
                data-slot="circular-progress-indicator-output"
              >
                {renderProps.percentage ?? ""}
                {renderProps.percentage === undefined ? "" : "%"}
              </span>
            </div>
          )}
        </>
      ))}
    </RACProgressBar>
  );
}
