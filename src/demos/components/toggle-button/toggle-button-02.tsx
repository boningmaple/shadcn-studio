import { StarIcon } from "lucide-react";

import { ToggleButton } from "@/components/toggle-button/toggle-button";

export default function ToggleButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <ToggleButton variant="elevated">
        <StarIcon />
        Elevated
      </ToggleButton>
      <ToggleButton variant="filled">
        <StarIcon />
        Filled
      </ToggleButton>
      <ToggleButton variant="tonal">
        <StarIcon />
        Tonal
      </ToggleButton>
      <ToggleButton variant="outlined">
        <StarIcon />
        Outlined
      </ToggleButton>
    </div>
  );
}
