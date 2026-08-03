import { StarIcon } from "lucide-react";

import { M3Button } from "@/material-3-ui/components/m3-button/m3-button";

export default function M3ButtonDemo() {
  return (
    <div className="flex w-full flex-wrap items-center justify-center gap-3 sm:flex-nowrap sm:gap-4">
      <M3Button variant="elevated">
        <StarIcon />
        Elevated
      </M3Button>
      <M3Button variant="filled">
        <StarIcon />
        Filled
      </M3Button>
      <M3Button variant="tonal">
        <StarIcon />
        Tonal
      </M3Button>
      <M3Button variant="outlined">
        <StarIcon />
        Outlined
      </M3Button>
      <M3Button variant="text">
        <StarIcon />
        Text
      </M3Button>
    </div>
  );
}
