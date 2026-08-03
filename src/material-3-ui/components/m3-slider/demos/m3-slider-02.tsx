import { M3Slider } from "@/material-3-ui/components/m3-slider/m3-slider";

export default function M3SliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <M3Slider
        defaultValue={30}
        maxValue={100}
        minValue={0}
        showTicks
        step={10}
      >
        Sound level
      </M3Slider>
      <M3Slider defaultValue={15} maxValue={60} minValue={0} showTicks step={5}>
        Buffer size
      </M3Slider>
      <M3Slider
        defaultValue={4}
        formatOptions={{ maximumFractionDigits: 0 }}
        maxValue={8}
        minValue={1}
        showTicks
        step={1}
      >
        Review score
      </M3Slider>
    </div>
  );
}
