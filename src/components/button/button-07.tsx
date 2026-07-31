import { Button } from "@/components/button/button";

export default function ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <Button variant="text">Enabled</Button>
      <Button isDisabled variant="text">
        Disabled
      </Button>
      <Button className="before:opacity-[0.08]" variant="text">
        Hovered
      </Button>
      <Button
        className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
        variant="text"
      >
        Focused
      </Button>
      <Button className="rounded-[8px] before:opacity-[0.1]" variant="text">
        Pressed
      </Button>
    </div>
  );
}
