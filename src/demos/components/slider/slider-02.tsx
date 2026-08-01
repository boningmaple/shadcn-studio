import { Slider } from "@/components/slider/slider";

export default function SliderDemo() {
  return (
    <div className="grid w-full max-w-lg gap-7">
      <Slider defaultValue={30} maxValue={100} minValue={0} showTicks step={10}>
        Sound level
      </Slider>
      <Slider defaultValue={15} maxValue={60} minValue={0} showTicks step={5}>
        Buffer size
      </Slider>
      <Slider
        defaultValue={4}
        formatOptions={{ maximumFractionDigits: 0 }}
        maxValue={8}
        minValue={1}
        showTicks
        step={1}
      >
        Review score
      </Slider>
    </div>
  );
}
