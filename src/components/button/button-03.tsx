import { Button } from "@/components/button/button";

export default function ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <Button variant="elevated">Enabled</Button>
      <Button isDisabled variant="elevated">
        Disabled
      </Button>
      <Button
        className="before:opacity-[0.08] shadow-[0_2px_6px_2px_rgb(0_0_0/0.15),0_1px_2px_0_rgb(0_0_0/0.3)]"
        variant="elevated"
      >
        Hovered
      </Button>
      <Button
        className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
        variant="elevated"
      >
        Focused
      </Button>
      <Button className="rounded-[8px] before:opacity-[0.1]" variant="elevated">
        Pressed
      </Button>
    </div>
  );
}
