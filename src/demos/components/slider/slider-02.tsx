import { Slider } from "@/components/slider/slider";

export default function SliderDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <Slider defaultValue={30} maxValue={100} minValue={0} step={10}>
        Sound level
      </Slider>
      <Slider defaultValue={15} maxValue={60} minValue={0} step={5}>
        Buffer size
      </Slider>
    </div>
  );
}
