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
      "group/slider relative flex w-full min-w-0 touch-none flex-col gap-4 select-none",
      "data-disabled:cursor-not-allowed",
    ],
    header: "flex w-full items-center justify-between gap-4",
    label: "text-sm leading-5 font-medium text-[#1d1b20] dark:text-[#e6e0e9]",
    output: "text-sm leading-5 text-[#49454f] dark:text-[#cac4d0]",
    track: [
      "relative h-1 w-full grow rounded-full bg-[#e6e0e9] py-2.5",
      "data-orientation-vertical:h-full data-orientation-vertical:w-1 data-orientation-vertical:px-2.5 data-orientation-vertical:py-0",
      "data-disabled:bg-[#1D1B20]/12",
      "dark:bg-[#49454f] dark:data-disabled:bg-[#E6E0E9]/12",
    ],
    fill: [
      "rounded-full bg-[#6750a4]",
      "data-disabled:bg-[#1D1B20]/38",
      "dark:bg-[#d0bcff] dark:data-disabled:bg-[#E6E0E9]/38",
    ],
    thumb: [
      "relative size-5 rounded-full bg-[#6750a4] text-[#6750a4] outline-none select-none",
      "transition-[transform,background-color] duration-200 ease-[cubic-bezier(0.2,0,0,1)]",
      "before:pointer-events-none before:absolute before:inset-0 before:rounded-full before:bg-current before:opacity-0 before:transition-opacity before:duration-200 before:ease-[cubic-bezier(0.2,0,0,1)]",
      "group-data-orientation-horizontal/slider:top-1/2",
      "group-data-orientation-vertical/slider:left-1/2",
      "data-hovered:before:opacity-[0.08]",
      "data-focus-visible:before:opacity-[0.1]",
      "data-dragging:before:opacity-[0.12]",
      "data-disabled:bg-[#1D1B20]/38 data-disabled:before:opacity-0",
      "dark:bg-[#d0bcff] dark:text-[#d0bcff]",
      "dark:data-disabled:bg-[#E6E0E9]/38",
      "motion-reduce:transition-none motion-reduce:before:transition-none",
    ],
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
    root: (props?: SliderSlotProps) => styles.root(props),
    thumb: (props?: SliderSlotProps) => styles.thumb(props),
    track: (props?: SliderSlotProps) => styles.track(props),
  };
}

export type SliderProps = React.ComponentPropsWithRef<typeof RACSlider>;

export function Slider({ children, className, ...props }: SliderProps) {
  const { fill, header, label, output, root, thumb, track } = sliderVariants();

  return (
    <RACSlider
      className={composeRenderProps(className, (className) =>
        root({ className }),
      )}
      data-slot="slider"
      {...props}
    >
      {composeRenderProps(children, (children, { state }) => (
        <>
          {children === undefined || children === null ? null : (
            <div className={header()} data-slot="slider-header">
              <RACLabel className={label()} data-slot="slider-label">
                {children}
              </RACLabel>
              <RACSliderOutput className={output()} data-slot="slider-output">
                {state.values
                  .map((_, index) => state.getThumbValueLabel(index))
                  .join(" – ")}
              </RACSliderOutput>
            </div>
          )}
          <RACSliderTrack className={track()} data-slot="slider-track">
            <RACSliderFill className={fill()} data-slot="slider-fill" />
            {state.values.map((_, index) => (
              <RACSliderThumb
                className={thumb()}
                data-slot="slider-thumb"
                index={index}
                key={index}
              />
            ))}
          </RACSliderTrack>
        </>
      ))}
    </RACSlider>
  );
}

export type RangeSliderProps = SliderProps;

export function RangeSlider(props: RangeSliderProps) {
  return <Slider {...props} />;
}
