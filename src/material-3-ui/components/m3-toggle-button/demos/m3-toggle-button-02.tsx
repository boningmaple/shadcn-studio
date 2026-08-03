import { StarIcon } from "lucide-react";

import { M3ToggleButton } from "@/material-3-ui/components/m3-toggle-button/m3-toggle-button";

export default function M3ToggleButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <M3ToggleButton variant="elevated">
        <StarIcon />
        Elevated
      </M3ToggleButton>
      <M3ToggleButton variant="filled">
        <StarIcon />
        Filled
      </M3ToggleButton>
      <M3ToggleButton variant="tonal">
        <StarIcon />
        Tonal
      </M3ToggleButton>
      <M3ToggleButton variant="outlined">
        <StarIcon />
        Outlined
      </M3ToggleButton>
    </div>
  );
}
