import { Button } from "@/components/button/button";

export default function ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <Button variant="outlined">Enabled</Button>
      <Button isDisabled variant="outlined">
        Disabled
      </Button>
      <Button className="before:opacity-[0.08]" variant="outlined">
        Hovered
      </Button>
      <Button
        className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
        variant="outlined"
      >
        Focused
      </Button>
      <Button className="rounded-[8px] before:opacity-[0.1]" variant="outlined">
        Pressed
      </Button>
    </div>
  );
}
