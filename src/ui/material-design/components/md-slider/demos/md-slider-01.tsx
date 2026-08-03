import { MDSlider } from "@/ui/material-design/components/md-slider/md-slider";

export default function MDSliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <MDSlider defaultValue={64}>Media volume</MDSlider>
      <MDSlider defaultValue={38} maxValue={100} minValue={0}>
        Display brightness
      </MDSlider>
      <MDSlider defaultValue={70} isDisabled>
        Disabled setting
      </MDSlider>
    </div>
  );
}
