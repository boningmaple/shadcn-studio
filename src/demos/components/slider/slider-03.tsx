import { RangeSlider } from "@/components/slider/slider";

export default function SliderDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <RangeSlider defaultValue={[20, 80]} maxValue={500} minValue={0}>
        Price range
      </RangeSlider>
      <RangeSlider defaultValue={[25, 75]} maxValue={24} minValue={0} step={1}>
        Event time range
      </RangeSlider>
    </div>
  );
}
