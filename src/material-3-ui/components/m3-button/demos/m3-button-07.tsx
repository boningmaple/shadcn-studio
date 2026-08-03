import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";

export default function M3ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-4">
      <M3Button variant="text">Enabled</M3Button>
      <M3Button isDisabled variant="text">
        Disabled
      </M3Button>
      <M3Button className="before:opacity-[0.08]" variant="text">
        Hovered
      </M3Button>
      <M3Button
        className="before:opacity-[0.1] outline-2 outline-solid outline-offset-2 outline-[#6750a4] dark:outline-[#d0bcff]"
        variant="text"
      >
        Focused
      </M3Button>
      <M3Button className="rounded-[8px] before:opacity-[0.1]" variant="text">
        Pressed
      </M3Button>
    </div>
  );
}
