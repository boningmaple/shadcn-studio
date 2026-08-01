import { RangeSlider } from "@/components/slider/slider";

export default function SliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <RangeSlider
        defaultValue={[120, 360]}
        formatOptions={{ style: "currency", currency: "USD" }}
        maxValue={500}
        minValue={0}
        step={10}
      >
        Price range
      </RangeSlider>
      <RangeSlider
        defaultValue={[9, 17]}
        maxValue={24}
        minValue={0}
        showTicks
        step={3}
      >
        Event time range
      </RangeSlider>
    </div>
  );
}
