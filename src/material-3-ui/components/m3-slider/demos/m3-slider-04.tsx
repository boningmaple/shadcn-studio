import { M3Slider } from "@/material-3-ui/components/m3-slider/m3-slider";

export default function M3SliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <M3Slider
        defaultValue={0.45}
        formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
        maxValue={1}
        minValue={0}
        step={0.01}
      >
        Completion
      </M3Slider>
      <M3Slider
        defaultValue={120}
        formatOptions={{ style: "currency", currency: "USD" }}
        maxValue={1000}
        minValue={0}
        step={10}
      >
        Daily budget
      </M3Slider>
      <M3Slider
        defaultValue={22}
        formatOptions={{ style: "unit", unit: "celsius" }}
        maxValue={30}
        minValue={10}
      >
        Target temperature
      </M3Slider>
    </div>
  );
}
