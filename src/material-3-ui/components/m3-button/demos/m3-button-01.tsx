import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";

export default function M3ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <M3Button variant="elevated">Elevated</M3Button>
      <M3Button variant="filled">Filled</M3Button>
      <M3Button variant="tonal">Tonal</M3Button>
      <M3Button variant="outlined">Outlined</M3Button>
      <M3Button variant="text">Text</M3Button>
    </div>
  );
}
