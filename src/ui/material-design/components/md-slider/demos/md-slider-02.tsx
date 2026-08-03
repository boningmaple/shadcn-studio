import { MDSlider } from "@/ui/material-design/components/md-slider/md-slider";

export default function MDSliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <MDSlider
        defaultValue={30}
        maxValue={100}
        minValue={0}
        showTicks
        step={10}
      >
        Sound level
      </MDSlider>
      <MDSlider defaultValue={15} maxValue={60} minValue={0} showTicks step={5}>
        Buffer size
      </MDSlider>
      <MDSlider
        defaultValue={4}
        formatOptions={{ maximumFractionDigits: 0 }}
        maxValue={8}
        minValue={1}
        showTicks
        step={1}
      >
        Review score
      </MDSlider>
    </div>
  );
}
