import { StarIcon } from "lucide-react";

import { MDToggleButton } from "@/ui/material-design/components/md-toggle-button/md-toggle-button";

export default function MDToggleButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <MDToggleButton variant="elevated">
        <StarIcon />
        Elevated
      </MDToggleButton>
      <MDToggleButton variant="filled">
        <StarIcon />
        Filled
      </MDToggleButton>
      <MDToggleButton variant="tonal">
        <StarIcon />
        Tonal
      </MDToggleButton>
      <MDToggleButton variant="outlined">
        <StarIcon />
        Outlined
      </MDToggleButton>
    </div>
  );
}
