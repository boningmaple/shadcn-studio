import { Slider } from "@/components/slider/slider";

export default function SliderDemo() {
  return (
    <div className="grid w-full max-w-md gap-6">
      <Slider
        defaultValue={45}
        formatOptions={{ style: "percent", maximumFractionDigits: 0 }}
        maxValue={100}
        minValue={0}
      >
        Brightness
      </Slider>
      <Slider
        defaultValue={120}
        formatOptions={{ style: "currency", currency: "USD" }}
        maxValue={1000}
        minValue={0}
        step={10}
      >
        Daily budget
      </Slider>
      <Slider
        defaultValue={22}
        formatOptions={{ style: "unit", unit: "celsius" }}
        maxValue={30}
        minValue={10}
      >
        Target temperature
      </Slider>
    </div>
  );
}
