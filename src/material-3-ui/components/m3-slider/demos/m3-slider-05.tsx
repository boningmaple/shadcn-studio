import {
  M3RangeSlider,
  M3Slider,
} from "@/material-3-ui/components/m3-slider/m3-slider";

export default function M3SliderDemo() {
  return (
    <div className="flex w-full max-w-lg items-stretch justify-around gap-6">
      <M3Slider
        aria-label="Vertical volume"
        className="h-48 w-12"
        defaultValue={50}
        orientation="vertical"
        showValueIndicator={false}
      />
      <M3Slider
        aria-label="Vertical zoom"
        className="h-48 w-12"
        defaultValue={80}
        orientation="vertical"
        showValueIndicator={false}
      />
      <M3RangeSlider
        aria-label="Vertical range"
        className="h-48 w-12"
        defaultValue={[20, 60]}
        orientation="vertical"
        showTicks
        showValueIndicator={false}
        step={20}
      />
    </div>
  );
}
