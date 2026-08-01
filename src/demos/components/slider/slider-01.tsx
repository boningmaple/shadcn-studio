import { Slider } from "@/components/slider/slider";

export default function SliderDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <Slider defaultValue={40}>Volume</Slider>
      <Slider isDisabled defaultValue={40}>
        Disabled
      </Slider>
      <Slider defaultValue={70} isDisabled>
        Disabled with value
      </Slider>
    </div>
  );
}
