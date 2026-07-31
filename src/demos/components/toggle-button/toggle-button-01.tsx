import { ToggleButton } from "@/components/toggle-button/toggle-button";

export default function ToggleButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <ToggleButton variant="elevated">Elevated</ToggleButton>
      <ToggleButton variant="filled">Filled</ToggleButton>
      <ToggleButton variant="tonal">Tonal</ToggleButton>
      <ToggleButton variant="outlined">Outlined</ToggleButton>
    </div>
  );
}
