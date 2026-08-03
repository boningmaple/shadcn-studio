import { M3Slider } from "@/material-3-ui/components/m3-slider/m3-slider";

export default function M3SliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <M3Slider defaultValue={64}>Media volume</M3Slider>
      <M3Slider defaultValue={38} maxValue={100} minValue={0}>
        Display brightness
      </M3Slider>
      <M3Slider defaultValue={70} isDisabled>
        Disabled setting
      </M3Slider>
    </div>
  );
}
