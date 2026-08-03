import { MDSlider } from "@/ui/material-design/components/md-slider/md-slider";

export default function MDSliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <MDSlider
        defaultValue={0.45}
        formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
        maxValue={1}
        minValue={0}
        step={0.01}
      >
        Completion
      </MDSlider>
      <MDSlider
        defaultValue={120}
        formatOptions={{ style: "currency", currency: "USD" }}
        maxValue={1000}
        minValue={0}
        step={10}
      >
        Daily budget
      </MDSlider>
      <MDSlider
        defaultValue={22}
        formatOptions={{ style: "unit", unit: "celsius" }}
        maxValue={30}
        minValue={10}
      >
        Target temperature
      </MDSlider>
    </div>
  );
}
