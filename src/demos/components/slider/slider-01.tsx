import { Slider } from "@/components/slider/slider";

export default function SliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <Slider defaultValue={64}>Media volume</Slider>
      <Slider defaultValue={38} maxValue={100} minValue={0}>
        Display brightness
      </Slider>
      <Slider defaultValue={70} isDisabled>
        Disabled setting
      </Slider>
    </div>
  );
}
