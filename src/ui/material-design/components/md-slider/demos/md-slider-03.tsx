import { MDRangeSlider } from "@/ui/material-design/components/md-slider/md-slider";

export default function MDSliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <MDRangeSlider
        defaultValue={[120, 360]}
        formatOptions={{ style: "currency", currency: "USD" }}
        maxValue={500}
        minValue={0}
        step={10}
      >
        Price range
      </MDRangeSlider>
      <MDRangeSlider
        defaultValue={[9, 17]}
        maxValue={24}
        minValue={0}
        showTicks
        step={3}
      >
        Event time range
      </MDRangeSlider>
    </div>
  );
}
