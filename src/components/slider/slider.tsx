import type * as React from "react";
import {
  Label as RACLabel,
  Slider as RACSlider,
  SliderFill as RACSliderFill,
  SliderOutput as RACSliderOutput,
  SliderThumb as RACSliderThumb,
  SliderTrack as RACSliderTrack,
  composeRenderProps,
} from "react-aria-components";
import { tv, type VariantProps } from "tailwind-variants";

export const sliderStyles = tv({
  slots: {
    root: [
      "group/slider relative flex w-full min-w-0 touch-none flex-col gap-3 select-none",
      "data-disabled:cursor-not-allowed",
    ],
    header: "flex w-full items-center justify-between gap-4 px-0.5",
    label: "text-sm leading-5 font-medium text-[#1d1b20] dark:text-[#e6e0e9]",
    output: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    track: ["relative grow outline-none", "data-disabled:opacity-60"],
    rail: [
      "pointer-events-none absolute rounded-full bg-[#e6e0e9]",
      "dark:bg-[#49454f]",
    ],
    fill: [
      "absolute rounded-full bg-[#6750a4]",
      "data-disabled:bg-[#1D1B20]/38",
      "dark:bg-[#d0bcff] dark:data-disabled:bg-[#E6E0E9]/38",
    ],
    stop: [
      "pointer-events-none absolute z-10 rounded-full bg-[#6750a4]",
      "data-disabled:bg-[#1D1B20]/38",
      "dark:bg-[#d0bcff] dark:data-disabled:bg-[#E6E0E9]/38",
    ],
    tick: [
      "pointer-events-none absolute z-10 rounded-full bg-[#49454f]/38",
      "data-active:bg-[#fffbfe]",
      "dark:bg-[#cac4d0]/38 dark:data-active:bg-[#381e72]",
    ],
    thumb: [
      "group/thumb relative z-20 flex items-center justify-center rounded-full bg-[#6750a4] text-[#6750a4] outline-none select-none",
      "transition-[width,height,background-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "data-hovered:before:opacity-[0.08]",
      "data-focus-visible:before:opacity-[0.1]",
      "data-dragging:before:opacity-[0.12]",
      "data-disabled:bg-[#1D1B20]/38 data-disabled:before:opacity-0",
      "dark:bg-[#d0bcff] dark:text-[#d0bcff]",
      "dark:data-disabled:bg-[#E6E0E9]/38",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
    ],
    valueIndicator: [
      "pointer-events-none absolute z-30 hidden rounded-[4px] bg-[#6750a4] px-2 py-1 text-xs leading-4 font-medium whitespace-nowrap text-white",
      "shadow-[0_1px_2px_0_rgb(0_0_0/0.3),0_1px_3px_1px_rgb(0_0_0/0.15)]",
      "group-data-dragging/thumb:block group-data-focus-visible/thumb:block",
      "dark:bg-[#d0bcff] dark:text-[#381e72]",
    ],
  },
  variants: {
    orientation: {
      horizontal: {
        root: "items-stretch",
        track: "h-12 w-full",
        rail: "inset-x-0 top-1/2 h-4 -translate-y-1/2",
        fill: "top-1/2 h-4 -translate-y-1/2",
        stop: "top-1/2 size-1.5 -translate-y-1/2",
        tick: "top-1/2 size-1 -translate-x-1/2 -translate-y-1/2",
        thumb: "top-1/2 h-11 w-1.5 data-dragging:w-3 data-hovered:w-3",
        valueIndicator: "bottom-full left-1/2 mb-2 -translate-x-1/2",
      },
      vertical: {
        root: "h-full items-center",
        header: "sr-only",
        track: "h-full min-h-48 w-12",
        rail: "inset-y-0 left-1/2 w-4 -translate-x-1/2",
        fill: "left-1/2 w-4 -translate-x-1/2",
        stop: "left-1/2 size-1.5 -translate-x-1/2",
        tick: "left-1/2 size-1 -translate-x-1/2 translate-y-1/2",
        thumb: "left-1/2 h-1.5 w-11 data-dragging:h-3 data-hovered:h-3",
        valueIndicator: "top-1/2 left-full ms-2 -translate-y-1/2",
      },
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type SliderVariantProps = VariantProps<typeof sliderStyles>;
type SliderSlotProps = Parameters<ReturnType<typeof sliderStyles>["root"]>[0];

export function sliderVariants() {
  const styles = sliderStyles();

  return {
    fill: (props?: SliderSlotProps) => styles.fill(props),
    header: (props?: SliderSlotProps) => styles.header(props),
    label: (props?: SliderSlotProps) => styles.label(props),
    output: (props?: SliderSlotProps) => styles.output(props),
    rail: (props?: SliderSlotProps) => styles.rail(props),
    root: (props?: SliderSlotProps) => styles.root(props),
    stop: (props?: SliderSlotProps) => styles.stop(props),
    thumb: (props?: SliderSlotProps) => styles.thumb(props),
    tick: (props?: SliderSlotProps) => styles.tick(props),
    track: (props?: SliderSlotProps) => styles.track(props),
    valueIndicator: (props?: SliderSlotProps) => styles.valueIndicator(props),
  };
}

export type SliderProps = React.ComponentPropsWithRef<typeof RACSlider> & {
  showStopIndicators?: boolean;
  showTicks?: boolean;
  showValueIndicator?: boolean;
};

export function Slider({
  children,
  className,
  maxValue = 100,
  minValue = 0,
  showStopIndicators = true,
  showTicks = false,
  showValueIndicator = true,
  step,
  ...props
}: SliderProps) {
  const {
    fill,
    header,
    label,
    output,
    rail,
    root,
    stop,
    thumb,
    tick,
    track,
    valueIndicator,
  } = sliderVariants();

  return (
    <RACSlider
      className={composeRenderProps(className, (className, renderProps) =>
        root({ className, orientation: renderProps.orientation }),
      )}
      data-slot="slider"
      maxValue={maxValue}
      minValue={minValue}
      step={step}
      {...props}
    >
      {composeRenderProps(children, (children, { orientation, state }) => {
        const hasVisibleLabel = children !== undefined && children !== null;
        const activeOffset =
          state.values.length > 1 ? state.getThumbPercent(0) : 0;
        const tickValues = showTicks
          ? getSliderTickValues(minValue, maxValue, step ?? state.step)
          : [];

        return (
          <>
            {hasVisibleLabel ? (
              <div
                className={header({ orientation })}
                data-slot="slider-header"
              >
                <RACLabel className={label()} data-slot="slider-label">
                  {children}
                </RACLabel>
                <RACSliderOutput className={output()} data-slot="slider-output">
                  {state.values
                    .map((_, index) => state.getThumbValueLabel(index))
                    .join(" - ")}
                </RACSliderOutput>
              </div>
            ) : null}
            <RACSliderTrack
              className={track({ orientation })}
              data-slot="slider-track"
            >
              <span className={rail({ orientation })} data-slot="slider-rail" />
              <RACSliderFill
                className={(renderProps) =>
                  fill({ orientation: renderProps.orientation })
                }
                data-slot="slider-fill"
                offset={activeOffset}
              />
              {showStopIndicators ? (
                <SliderStopIndicators
                  className={stop({ orientation })}
                  orientation={orientation}
                />
              ) : null}
              {tickValues.map((value) => (
                <SliderTick
                  className={tick({ orientation })}
                  isActive={isSliderTickActive(state.values, value, minValue)}
                  key={value}
                  orientation={orientation}
                  percent={state.getValuePercent(value)}
                />
              ))}
              {state.values.map((_, index) => (
                <RACSliderThumb
                  className={thumb({ orientation })}
                  data-slot="slider-thumb"
                  index={index}
                  key={index}
                >
                  {showValueIndicator ? (
                    <span
                      className={valueIndicator({ orientation })}
                      data-slot="slider-value-indicator"
                    >
                      {state.getThumbValueLabel(index)}
                    </span>
                  ) : null}
                </RACSliderThumb>
              ))}
            </RACSliderTrack>
          </>
        );
      })}
    </RACSlider>
  );
}

export type RangeSliderProps = SliderProps;

export function RangeSlider(props: RangeSliderProps) {
  return <Slider {...props} />;
}

function SliderStopIndicators({
  className,
  orientation,
}: {
  className: string;
  orientation: "horizontal" | "vertical";
}) {
  const startStyle = orientation === "vertical" ? { bottom: 0 } : { left: 0 };
  const endStyle = orientation === "vertical" ? { top: 0 } : { right: 0 };

  return (
    <>
      <span className={className} data-slot="slider-stop" style={startStyle} />
      <span className={className} data-slot="slider-stop" style={endStyle} />
    </>
  );
}

function SliderTick({
  className,
  isActive,
  orientation,
  percent,
}: {
  className: string;
  isActive: boolean;
  orientation: "horizontal" | "vertical";
  percent: number;
}) {
  const style =
    orientation === "vertical"
      ? { bottom: `${percent * 100}%` }
      : { left: `${percent * 100}%` };

  return (
    <span
      className={className}
      data-active={isActive || undefined}
      data-slot="slider-tick"
      style={style}
    />
  );
}

function getSliderTickValues(minValue: number, maxValue: number, step: number) {
  if (step <= 0) {
    return [];
  }

  const tickCount = Math.floor((maxValue - minValue) / step);

  if (tickCount <= 1 || tickCount > 48) {
    return [];
  }

  return Array.from(
    { length: tickCount - 1 },
    (_, index) => minValue + step * (index + 1),
  );
}

function isSliderTickActive(values: number[], value: number, minValue: number) {
  const sortedValues = [...values].sort((a, b) => a - b);
  const startValue = sortedValues.length > 1 ? sortedValues[0] : minValue;
  const endValue = sortedValues.at(-1) ?? 0;

  return value >= startValue && value <= endValue;
}
