import {
  MDRangeSlider,
  MDSlider,
} from "@/ui/material-design/components/md-slider/md-slider";

export default function MDSliderDemo() {
  return (
    <div className="flex w-full max-w-lg items-stretch justify-around gap-6">
      <MDSlider
        aria-label="Vertical volume"
        className="h-48 w-12"
        defaultValue={50}
        orientation="vertical"
        showValueIndicator={false}
      />
      <MDSlider
        aria-label="Vertical zoom"
        className="h-48 w-12"
        defaultValue={80}
        orientation="vertical"
        showValueIndicator={false}
      />
      <MDRangeSlider
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
