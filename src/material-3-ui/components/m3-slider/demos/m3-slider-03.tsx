import { M3RangeSlider } from "@/material-3-ui/components/m3-slider/m3-slider";

export default function M3SliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <M3RangeSlider
        defaultValue={[120, 360]}
        formatOptions={{ style: "currency", currency: "USD" }}
        maxValue={500}
        minValue={0}
        step={10}
      >
        Price range
      </M3RangeSlider>
      <M3RangeSlider
        defaultValue={[9, 17]}
        maxValue={24}
        minValue={0}
        showTicks
        step={3}
      >
        Event time range
      </M3RangeSlider>
    </div>
  );
}
