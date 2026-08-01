import { RangeSlider, Slider } from "@/components/slider/slider";

export default function SliderDemo() {
  return (
    <div className="flex w-full max-w-md items-stretch justify-around gap-6">
      <Slider
        aria-label="Vertical volume"
        className="h-48 w-12"
        defaultValue={50}
        orientation="vertical"
      />
      <Slider
        aria-label="Vertical zoom"
        className="h-48 w-12"
        defaultValue={80}
        orientation="vertical"
      />
      <RangeSlider
        aria-label="Vertical range"
        className="h-48 w-12"
        defaultValue={[20, 60]}
        orientation="vertical"
      />
    </div>
  );
}
